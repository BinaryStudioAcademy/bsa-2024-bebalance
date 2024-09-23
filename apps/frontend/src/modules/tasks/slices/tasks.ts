import {
	getCurrentTasks,
	getPastTasks,
	update,
	updateTaskDeadline,
} from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentTasks,
	getPastTasks,
	update,
	updateTaskDeadline,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
