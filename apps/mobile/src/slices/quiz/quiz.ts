import { getAllQuestions, getScores, saveAnswers, editScores } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	getAllQuestions,
	getScores,
	saveAnswers,
	editScores,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
