import {
	changeTasksSuggestion,
	createTasksFromSuggestions,
	getTasksForCategories,
	initConversation,
} from "./actions.js";
import { actions } from "./chat.slice.js";

const allActions = {
	...actions,
	changeTasksSuggestion,
	createTasksFromSuggestions,
	getTasksForCategories,
	initConversation,
};

export { allActions as actions };
export { reducer } from "./chat.slice.js";
