import { editScores, getAllQuestions, getScores, saveAnswers } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	editScores,
	getAllQuestions,
	getScores,
	saveAnswers,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
