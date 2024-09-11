import { getAllUsersTasks } from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	getAllUsersTasks,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
