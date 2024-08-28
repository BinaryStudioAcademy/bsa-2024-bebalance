import {
	getAuthenticatedUser,
	resetPassword,
	sendResetPasswordLink,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	resetPassword,
	sendResetPasswordLink,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
