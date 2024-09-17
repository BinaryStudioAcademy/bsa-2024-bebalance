import { getCurrentTasks } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentTasks,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
