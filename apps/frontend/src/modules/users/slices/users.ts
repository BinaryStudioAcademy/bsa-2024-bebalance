import {
	getById,
	saveNotificationAnswers,
	update,
	uploadAvatar,
} from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getById,
	saveNotificationAnswers,
	update,
	uploadAvatar,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
