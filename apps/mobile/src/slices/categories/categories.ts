import { getCategories } from "./actions";
import { actions } from "./categories.slice";

const allActions = {
	...actions,
	getQuizCategories: getCategories,
};

export { allActions as actions };
export { reducer } from "./categories.slice";
