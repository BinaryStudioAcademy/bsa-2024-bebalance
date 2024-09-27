import {
	getCurrentTasks,
	getPastTasks,
	updateTask,
	updateTaskDeadline,
} from "./actions";
import { actions } from "./task.slice";

const allActions = {
	...actions,
	getCurrentTasks,
	getPastTasks,
	updateTask,
	updateTaskDeadline,
};

export { allActions as actions };
export { reducer } from "./task.slice";
