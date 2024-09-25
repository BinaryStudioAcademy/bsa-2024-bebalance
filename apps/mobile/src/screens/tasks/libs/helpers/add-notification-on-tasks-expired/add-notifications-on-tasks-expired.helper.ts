import notifee, {
	type TimestampTrigger,
	TriggerType,
} from "@notifee/react-native";

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
		({ dueDate }) => new Date(dueDate).getTime() > Date.now(),
	);

	for (const task of tasksNotExpiredYet) {
		const { category, dueDate, id } = task;

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
								id: "task-expired",
							},
							title: "Look at task",
						},
					],
					channelId,
				},
				body: category,
				id: id.toString(),
				title: "You have a task expired",
			},
			trigger,
		);
	}
};

export { addNotificationsOnTasksExpired };
