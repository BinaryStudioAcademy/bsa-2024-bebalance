import { getQuestions } from "./actions.js";
import { actions } from "./quiz.slice.js";

const allActions = {
	...actions,
	getQuestions,
};

export { allActions as actions };
export { reducer } from "./quiz.slice.js";
