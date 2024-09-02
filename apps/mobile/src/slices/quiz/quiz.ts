import { getQuizCategories } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	getQuizCategories,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
