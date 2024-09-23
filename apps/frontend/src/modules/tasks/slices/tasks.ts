import {
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
	updateTaskDeadline,
} from "./actions.js";
import { actions } from "./tasks.slice.js";

const allActions = {
	...actions,
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
	updateTaskDeadline,
};

export { allActions as actions };
export { reducer } from "./tasks.slice.js";
