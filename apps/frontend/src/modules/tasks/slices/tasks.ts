import { getCurrentTasks, updateTask } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentTasks,
	updateTask,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
