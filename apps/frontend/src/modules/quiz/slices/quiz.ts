import { getAllQuestions, getScores, saveAnswers } from "./actions.js";
import { actions } from "./quiz.slice.js";

const allActions = {
	...actions,
	getAllQuestions,
	getScores,
	saveAnswers,
};

export { allActions as actions };
export { reducer } from "./quiz.slice.js";
