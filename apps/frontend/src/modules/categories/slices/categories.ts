import { getCategories } from "./actions.js";
import { actions } from "./categories.slice.js";

const allActions = {
	...actions,
	getCategories,
};

export { allActions as actions };
export { reducer } from "./categories.slice.js";
