import { getAllQuestions } from "./actions.js";
import { actions } from "./quiz.slice.js";

const allActions = {
	...actions,
	getAllQuestions,
};

export { allActions as actions };
export { reducer } from "./quiz.slice.js";
