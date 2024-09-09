import { isAction, type Middleware } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as authActions } from "~/modules/auth/auth.js";

type Properties = {
	action: unknown;
	next: (action: unknown) => unknown;
};

const handleErrorMiddleware = ({ action, next }: Properties): unknown => {
	if (
		isAction(action) &&
		(action.type === authActions.resetPassword.fulfilled.type ||
			action.type === authActions.checkIsResetPasswordExpired.rejected.type)
	) {
		store.instance.dispatch(appActions.changeLink(AppRoute.SIGN_IN));

		return next(action);
	}

	return next(action);
};

const createHandleRedirectMiddleware = (): Middleware => {
	return () => {
		return (next) => {
			return (action) => {
				handleErrorMiddleware({ action, next });
			};
		};
	};
};

export { createHandleRedirectMiddleware };
