import { getAllQuestions, getScores } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	getAllQuestions,
	getScores,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
