import notifee, {
	type TimestampTrigger,
	TriggerType,
} from "@notifee/react-native";

import { TaskStatus } from "~/libs/enums/enums";
import { type TaskDto } from "~/packages/tasks/tasks";

const addNotificationsOnTasksExpired = async (
	tasks: TaskDto[],
): Promise<void> => {
	await notifee.requestPermission();
	const channelId = await notifee.createChannel({
		id: "task-deadline",
		name: "default",
	});

	const tasksNotExpiredYet = tasks.filter(
		({ dueDate, status }) =>
			new Date(dueDate).getTime() > Date.now() && status === TaskStatus.CURRENT,
	);

	for (const task of tasksNotExpiredYet) {
		const { categoryName, dueDate, id } = task;

		const trigger: TimestampTrigger = {
			timestamp: new Date(dueDate).getTime(),
			type: TriggerType.TIMESTAMP,
		};
		await notifee.createTriggerNotification(
			{
				android: {
					actions: [
						{
							pressAction: {
								id: "task-deadline",
							},
							title: "Check the task",
						},
					],
					channelId,
				},
				body: categoryName,
				id: id.toString(),
				title: "You have a task expired",
			},
			trigger,
		);
	}
};

export { addNotificationsOnTasksExpired };
