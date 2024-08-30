import {
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
