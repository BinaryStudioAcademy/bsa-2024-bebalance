import { getCurrentTasks } from "./actions";
import { actions } from "./task.slice";

const allActions = {
	...actions,
	getCurrentTasks,
};

export { allActions as actions };
export { reducer } from "./task.slice";
