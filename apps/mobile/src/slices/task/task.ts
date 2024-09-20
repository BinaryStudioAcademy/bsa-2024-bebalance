import { getCurrentTasks, getPastTasks, updateTask } from "./actions";
import { actions } from "./task.slice";

const allActions = {
	...actions,
	getCurrentTasks,
	getPastTasks,
	updateTask,
};

export { allActions as actions };
export { reducer } from "./task.slice";
