import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { AppRoute, ErrorMessage } from "~/libs/enums/enums.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { store } from "~/libs/modules/store/store.js";
import { actions as appActions } from "~/modules/app/app.js";

import { type ExtraArguments } from "../../store.js";
import { type MiddlewareError } from "../types/types.js";

type Properties = {
	action: unknown;
	extra: ExtraArguments;
	next: (action: unknown) => unknown;
};

const handleErrorMiddlewareExecution = async ({
	action,
	extra: { notification, storage },
	next,
}: Properties): Promise<unknown> => {
	if (isRejected(action)) {
		switch (action.error.message) {
			case ErrorMessage.UNAUTHORIZED: {
				await storage.drop(StorageKey.TOKEN);
				store.instance.dispatch(appActions.changeLink(AppRoute.SIGN_IN));

				return next(action);
			}

			case ErrorMessage.RESET_PASSWORD_LINK_EXPIRED: {
				notification.error(ErrorMessage.RESET_PASSWORD_LINK_EXPIRED);
				store.instance.dispatch(appActions.changeLink(AppRoute.SIGN_IN));

				return next(action);
			}

			default: {
				const error = action.error as MiddlewareError;
				notification.error(error.data ? error.data.message : error.message);
				await storage.drop(StorageKey.TOKEN);
				store.instance.dispatch(appActions.changeLink(AppRoute.SIGN_IN));

				return next(action);
			}
		}
	}

	return next(action);
};

const handleErrorMiddleware = (extra: ExtraArguments): Middleware => {
	return () => {
		return (next) => {
			return async (action) => {
				await handleErrorMiddlewareExecution({ action, extra, next });
			};
		};
	};
};

export { handleErrorMiddleware };
