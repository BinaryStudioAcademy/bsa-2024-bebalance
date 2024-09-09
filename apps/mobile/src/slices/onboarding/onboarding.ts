import { getAll } from "./actions";
import { actions } from "./onboarding.slice";

const allActions = {
	...actions,
	getAll,
};

export { allActions as actions };
export { reducer } from "./onboarding.slice";
