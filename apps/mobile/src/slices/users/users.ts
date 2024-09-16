import { getById, saveNotificationAnswers } from "./actions";
import { actions } from "./users.slice";

const allActions = {
	...actions,
	getById,
	saveNotificationAnswers,
};

export { allActions as actions };
export { reducer } from "./users.slice";
