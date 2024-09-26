import notifee, {
	type InitialNotification,
	type TimestampTrigger,
	TriggerType,
} from "@notifee/react-native";

import { NumericalValue } from "~/libs/enums/enums";
import { type TaskDto } from "~/packages/tasks/tasks";

type TriggerNotificationParameters = {
	deadline: string;
	description: string;
	taskId: number;
};

const EXPIRED_TASK_NOTIFICATION_TITLE = "The task has expired";
const NOTFICATION_BODY_LENGTH = 50;

class ExpiredTaskNotification {
	#channelId: string;
	#triggerNotificationIds: string[];

	constructor(channelId: string) {
		this.#channelId = channelId;
		this.#triggerNotificationIds = [];
	}

	private addTriggerNotificationIdIfNotExist(id: string): void {
		const isInTriggerNotificationIds =
			this.#triggerNotificationIds.includes(id);

		if (!isInTriggerNotificationIds) {
			this.#triggerNotificationIds = [...this.#triggerNotificationIds, id];
		}
	}

	private createId(taskId: number): string {
		return taskId.toString();
	}

	private createTrigger(deadlineTimestamp: number): TimestampTrigger {
		const trigger: TimestampTrigger = {
			timestamp: deadlineTimestamp,
			type: TriggerType.TIMESTAMP,
		};

		return trigger;
	}

	private cutDescription(description: string): string {
		return description.length > NOTFICATION_BODY_LENGTH
			? description.slice(NumericalValue.ZERO, NOTFICATION_BODY_LENGTH) + "..."
			: description;
	}

	private getDeadlineIfInFuture(deadline: string): null | number {
		const deadlineTimestamp = new Date(deadline).getTime();
		const currentTimestamp = Date.now();
		const isInFuture = deadlineTimestamp > currentTimestamp;

		return isInFuture ? deadlineTimestamp : null;
	}

	private removeFromTriggerNotificationIds(id: string): void {
		this.#triggerNotificationIds = this.#triggerNotificationIds.filter(
			(notificationId) => {
				return notificationId !== id;
			},
		);
	}

	public async addToTasks(tasks: TaskDto[]): Promise<void> {
		for await (const task of tasks) {
			const { description, dueDate: deadline, id: taskId } = task;
			const hasTriggerNotification = this.existForTaskId(taskId);

			if (!hasTriggerNotification) {
				await this.createForNotExpired({ deadline, description, taskId });
			}
		}
	}

	public async cancel(taskId: number): Promise<void> {
		const id = this.createId(taskId);
		this.removeFromTriggerNotificationIds(id);
		await notifee.cancelTriggerNotification(id);
	}

	public async createForNotExpired({
		deadline,
		description,
		taskId,
	}: TriggerNotificationParameters): Promise<void> {
		const deadlineTimestamp = this.getDeadlineIfInFuture(deadline);

		if (!deadlineTimestamp) {
			return;
		}

		const isChannelExist = await notifee.getChannel(this.#channelId);

		if (!isChannelExist) {
			await notifee.requestPermission();

			this.#channelId = await notifee.createChannel({
				id: "default",
				name: "default",
			});
		}

		const trigger = this.createTrigger(deadlineTimestamp);
		const id = this.createId(taskId);

		await notifee.createTriggerNotification(
			{
				android: {
					channelId: this.#channelId,
				},
				body: this.cutDescription(description),
				id,
				title: EXPIRED_TASK_NOTIFICATION_TITLE,
			},
			trigger,
		);

		this.addTriggerNotificationIdIfNotExist(id);
	}

	public existForTaskId(taskId: number): boolean {
		const id = this.createId(taskId);

		return this.#triggerNotificationIds.includes(id);
	}

	public getIds(): string[] {
		return this.#triggerNotificationIds;
	}

	public async getInitial(): Promise<InitialNotification | null> {
		return await notifee.getInitialNotification();
	}
}

export { ExpiredTaskNotification };
