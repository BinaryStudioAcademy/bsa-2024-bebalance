import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { AppRoute, ErrorMessage } from "~/libs/enums/enums.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type ExtraArguments } from "~/libs/modules/store/store.js";
import { actions as appActions } from "~/modules/app/app.js";

import { type MiddlewareError } from "../types/types.js";

const handleErrorMiddleware = ({
	notification,
	storage,
}: ExtraArguments): Middleware => {
	return ({ dispatch }) => {
		return (next) => {
			return async (action) => {
				if (isRejected(action)) {
					switch (action.error.message) {
						case ErrorMessage.UNAUTHORIZED: {
							await storage.drop(StorageKey.TOKEN);

							return next(action);
						}

						case ErrorMessage.RESET_PASSWORD_LINK_EXPIRED: {
							notification.error(ErrorMessage.RESET_PASSWORD_LINK_EXPIRED);
							dispatch(appActions.changeLink(AppRoute.SIGN_IN));

							return next(action);
						}

						default: {
							const error = action.error as MiddlewareError;
							notification.error(
								error.data ? error.data.message : error.message,
							);

							return next(action);
						}
					}
				}

				return next(action);
			};
		};
	};
};

export { handleErrorMiddleware };
