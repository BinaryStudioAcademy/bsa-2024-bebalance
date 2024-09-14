import { editScores, getAllQuestions, getScores } from "./actions.js";
import { actions } from "./quiz.slice.js";

const allActions = {
	...actions,
	editScores,
	getAllQuestions,
	getScores,
};

export { allActions as actions };
export { reducer } from "./quiz.slice.js";
