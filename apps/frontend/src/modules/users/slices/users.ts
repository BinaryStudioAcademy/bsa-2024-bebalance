import { saveUserPreferences } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	saveUserPreferences,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
