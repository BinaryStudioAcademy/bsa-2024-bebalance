import notifee, {
	type InitialNotification,
	type Notification,
	type TimestampTrigger,
	TriggerType,
} from "@notifee/react-native";

import { NumericalValue } from "~/libs/enums/enums";
import { type TaskDto } from "~/packages/tasks/tasks";

import { ExpiredTaskNotificationSetting } from "./libs/enums/enums";

type TriggerNotificationParameters = {
	deadline: string;
	description: string;
	taskId: number;
};

const NOTFICATION_BODY_LENGTH = 50;

class ExpiredTaskNotification {
	#channelId: string;
	#triggerNotificationIds: string[] = [];
	#wasUsedOnceToOpenApp = false;

	constructor(channelId: string) {
		this.#channelId = channelId;
	}

	private addTriggerNotificationIdIfNotExist(taskId: number): void {
		const id = this.createId(taskId);
		const isInTriggerNotificationIds =
			this.#triggerNotificationIds.includes(id);

		if (!isInTriggerNotificationIds) {
			this.#triggerNotificationIds = [...this.#triggerNotificationIds, id];
		}
	}

	private async createChannel(): Promise<string> {
		return await notifee.createChannel({
			id: ExpiredTaskNotificationSetting.CHANNEL_ID,
			name: ExpiredTaskNotificationSetting.CHANNEL_NAME,
		});
	}

	private createId(taskId: number): string {
		return taskId.toString();
	}

	private createNotification({
		description,
		taskId,
	}: Omit<TriggerNotificationParameters, "deadline">): Notification {
		const id = this.createId(taskId);

		return {
			android: {
				channelId: this.#channelId,
				pressAction: {
					id: ExpiredTaskNotificationSetting.PRESS_ACTION_ID,
					launchActivity: ExpiredTaskNotificationSetting.LAUNCH_ACTIVITY,
				},
			},
			body: this.cutDescription(description),
			id,
			title: ExpiredTaskNotificationSetting.TITLE,
		};
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
		await notifee.cancelTriggerNotification(id);
		this.removeFromTriggerNotificationIds(id);
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
			this.#channelId = await this.createChannel();
		}

		const trigger = this.createTrigger(deadlineTimestamp);

		await notifee.createTriggerNotification(
			this.createNotification({ description, taskId }),
			trigger,
		);

		this.addTriggerNotificationIdIfNotExist(taskId);
	}

	public existForTaskId(taskId: number): boolean {
		const id = this.createId(taskId);

		return this.#triggerNotificationIds.includes(id);
	}

	public getIds(): string[] {
		return this.#triggerNotificationIds;
	}

	public async getInitial(): Promise<InitialNotification | null> {
		if (this.#wasUsedOnceToOpenApp) {
			return null;
		}

		this.#wasUsedOnceToOpenApp = true;

		return await notifee.getInitialNotification();
	}

	public handleBackgroundEvent(): void {
		notifee.onBackgroundEvent(async ({ detail }) => {
			const { notification } = detail;

			if (notification) {
				await notifee.cancelNotification(notification.id as string);
			}
		});
	}

	public async removeDisplayed(taskId: number): Promise<void> {
		const id = this.createId(taskId);
		await notifee.cancelDisplayedNotification(id);
	}
}

export { ExpiredTaskNotification };
