import { getAuthenticatedUser } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
