import { getAll, saveAnswers } from "./actions";
import { actions } from "./onboarding.slice";

const allActions = {
	...actions,
	getAll,
	saveAnswers,
};

export { allActions as actions };
export { reducer } from "./onboarding.slice";
