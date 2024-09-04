import { getById, saveUserPreferences, update } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getById,
	saveUserPreferences,
	update,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
