import {
	getById,
	saveNotificationAnswers,
	update,
	updateTasksCompletionPercentage,
	uploadAvatar,
} from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getById,
	saveNotificationAnswers,
	update,
	updateTasksCompletionPercentage,
	uploadAvatar,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
