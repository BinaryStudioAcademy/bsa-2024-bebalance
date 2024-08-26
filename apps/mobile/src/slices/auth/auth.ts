import { getAuthenticatedUser, signIn, signUp } from "./actions";
import { actions } from "./auth.slice";

const allActions = {
	...actions,
	getAuthenticatedUser,
	signIn,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice";
