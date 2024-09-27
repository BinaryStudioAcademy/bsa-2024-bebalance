import {
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
	saveAnswers,
} from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
	saveAnswers,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
