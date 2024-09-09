import { createUserAnswers, getAll } from "./actions.js";
import { actions } from "./onboarding.slice.js";

const allActions = {
	...actions,
	createUserAnswers,
	getAll,
};

export { allActions as actions };
export { reducer } from "./onboarding.slice.js";
