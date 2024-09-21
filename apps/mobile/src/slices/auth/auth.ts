import {
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signOut,
	signUp,
} from "./actions";
import { actions } from "./auth.slice";

const allActions = {
	...actions,
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signOut,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice";
