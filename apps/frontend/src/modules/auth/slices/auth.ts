import {
	getAuthenticatedUser,
	resetPassword,
	sendForgotPasswordLink,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	resetPassword,
	sendForgotPasswordLink,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
