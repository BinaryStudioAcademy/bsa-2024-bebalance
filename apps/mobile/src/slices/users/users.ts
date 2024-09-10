import { getById } from "./actions";
import { actions } from "./users.slice";

const allActions = {
	...actions,
	getById,
};

export { allActions as actions };
export { reducer } from "./users.slice";
