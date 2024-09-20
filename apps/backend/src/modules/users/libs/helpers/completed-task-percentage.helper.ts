import { type TaskModel } from "~/modules/tasks/tasks.js";

import { TaskCompletion, TaskStatus } from "../enums/enums.js";

const getCompletedTaskPercentage = (tasks: TaskModel[]): number => {
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(
		(task) => task.status === TaskStatus.COMPLETED,
	).length;

	return Math.ceil(
		(completedTasks / totalTasks) * TaskCompletion.ONE_HUNDRED_PERCENT,
	);
};

export { getCompletedTaskPercentage };
