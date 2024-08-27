import {
	getAuthenticatedUser,
	sendForgotPasswordLink,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	sendForgotPasswordLink,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
