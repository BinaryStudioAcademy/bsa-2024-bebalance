import {
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
} from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
