import {
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	logOut,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
	updatePassword,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	logOut,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
	updatePassword,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
