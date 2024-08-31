import { fetchQuizCategories } from "./actions.js";
import { actions } from "./quiz-categories.slice.js";

const allActions = {
	...actions,
	fetchQuizCategories,
};

export { allActions as actions };
export { reducer } from "./quiz-categories.slice.js";
