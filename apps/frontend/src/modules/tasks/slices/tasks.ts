import { getCurrentUsersTasks } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getCurrentUsersTasks,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
