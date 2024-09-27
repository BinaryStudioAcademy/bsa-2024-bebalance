import { TaskStatus } from "~/libs/enums/enums";
import { type TaskDto } from "~/packages/tasks/tasks";

type ActiveAndExpiredTasks = {
	activeTasks: TaskDto[];
	expiredTasks: TaskDto[];
};

const MILLISECONDS_PER_MINUTE = 60_000;

const getActiveAndExpiredTasks = (tasks: TaskDto[]): ActiveAndExpiredTasks => {
	const currentTimestamp = Date.now();
	const expiredTasks: TaskDto[] = [];
	const activeTasks: TaskDto[] = [];

	for (const task of tasks) {
		const { dueDate, status } = task;
		const deadlineTimestamp = new Date(dueDate).getTime();
		const timeToDeadline = deadlineTimestamp - currentTimestamp;

		if (
			timeToDeadline < MILLISECONDS_PER_MINUTE &&
			status === TaskStatus.CURRENT
		) {
			expiredTasks.push(task);
		} else {
			activeTasks.push(task);
		}
	}

	return { activeTasks, expiredTasks };
};

export { getActiveAndExpiredTasks };
