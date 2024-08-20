import { getAuthenticatedUser, loadAll } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
