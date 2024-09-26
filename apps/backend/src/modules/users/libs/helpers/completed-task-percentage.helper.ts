import { type TaskModel } from "~/modules/tasks/tasks.js";

import { TaskCompletion, TaskStatus } from "../enums/enums.js";

const getCompletedTaskPercentage = (tasks: TaskModel[]): number => {
	const nonSkippedTasks = tasks.filter(
		(task) => task.status !== TaskStatus.SKIPPED,
	);
	const totalNonSkippedTasks = nonSkippedTasks.length;
	const completedTasks = nonSkippedTasks.filter(
		(task) => task.status === TaskStatus.COMPLETED,
	).length;

	return Math.ceil(
		(completedTasks / totalNonSkippedTasks) *
			TaskCompletion.ONE_HUNDRED_PERCENT,
	);
};

export { getCompletedTaskPercentage };
