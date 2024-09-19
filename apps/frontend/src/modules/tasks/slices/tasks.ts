import { getCurrentTasks, updateTask, updateTaskDeadline } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentTasks,
	updateTask,
	updateTaskDeadline,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
