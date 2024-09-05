import { isRejected, type Middleware } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

import { AppRoute, ErrorMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";

import { type MiddlewareError } from "./libs/types/types.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => async (action) => {
		if (isRejected(action)) {
			switch (action.error.message) {
				case ErrorMessage.UNAUTHORIZED: {
					await storage.drop(StorageKey.TOKEN);

					return next(action);
				}

				case ErrorMessage.RESET_PASSWORD_LINK_EXPIRED: {
					redirect(AppRoute.FORGOT_PASSWORD);
					notification.error(ErrorMessage.RESET_PASSWORD_LINK_EXPIRED);

					return next(action);
				}

				default: {
					const error = action.error as MiddlewareError;
					notification.error(error.data ? error.data.message : error.message);

					return next(action);
				}
			}
		}

		return next(action);
	};
};

export { handleErrorMiddleware };
