import { getQuizCategories } from "./actions";
import { actions } from "./categories.slice";

const allActions = {
	...actions,
	getQuizCategories,
};

export { allActions as actions };
export { reducer } from "./categories.slice";
