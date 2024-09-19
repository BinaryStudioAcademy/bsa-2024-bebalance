import { type TaskModel } from "~/modules/tasks/tasks.js";

import { ONE_HUNDRED_PERCENT_COMPLETION } from "../constants/constants.js";
import { TaskStatus } from "../enums/enums.js";

const getCompletedTaskPercentage = (tasks: TaskModel[]): number => {
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(
		(task) => task.status === TaskStatus.COMPLETED,
	).length;

	return Math.ceil(
		(completedTasks / totalTasks) * ONE_HUNDRED_PERCENT_COMPLETION,
	);
};

export { getCompletedTaskPercentage };
