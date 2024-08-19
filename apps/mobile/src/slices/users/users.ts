import { loadAll } from "./actions";
import { actions } from "./users.slice";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./users.slice";
