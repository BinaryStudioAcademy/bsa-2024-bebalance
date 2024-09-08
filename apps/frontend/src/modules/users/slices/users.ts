import { getById, saveNotificationAnswers, update } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getById,
	saveNotificationAnswers,
	update,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
