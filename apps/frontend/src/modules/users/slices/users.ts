import { getUserFromAuth, update } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getUserFromAuth,
	update,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
