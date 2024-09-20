import { getCurrentTasks, getPastTasks, update } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentTasks,
	getPastTasks,
	update,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
