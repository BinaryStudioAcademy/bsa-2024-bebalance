import { getScores } from "./actions";
import { actions } from "./quiz.slice";

const allActions = {
	...actions,
	getScores,
};

export { allActions as actions };
export { reducer } from "./quiz.slice";
