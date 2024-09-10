import { getAllQuestions } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	getAllQuestions,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
