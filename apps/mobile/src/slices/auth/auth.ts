import { getAuthenticatedUser, signIn, signOut, signUp } from "./actions";
import { actions } from "./auth.slice";

const allActions = {
	...actions,
	getAuthenticatedUser,
	signIn,
	signOut,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice";
