import {
	createTasks,
	getChangedTasksSuggestion,
	getTasksForCategories,
	initConversation,
} from "./actions";
import { actions } from "./chat.slice";

const allActions = {
	...actions,
	createTasks,
	getChangedTasksSuggestion,
	getTasksForCategories,
	initConversation,
};

export { allActions as actions };
export { reducer } from "./chat.slice";
