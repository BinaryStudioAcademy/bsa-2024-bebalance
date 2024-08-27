import { getOnboardingSurvey } from "./actions.js";
import { actions } from "./onboarding.slice.js";

const allActions = {
	...actions,
	getOnboardingSurvey,
};

export { allActions as actions };
export { reducer } from "./onboarding.slice.js";
