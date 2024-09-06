import { isAction, type Middleware } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const handleRedirectMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (
			isAction(action) &&
			(action.type === authActions.resetPassword.fulfilled.type ||
				action.type === authActions.checkResetPasswordExp.rejected.type)
		) {
			store.instance.dispatch(appActions.changeLink(AppRoute.SIGN_IN));
		}

		return next(action);
	};
};

export { handleRedirectMiddleware };
