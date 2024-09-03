import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";

import { type MiddlewareError } from "./libs/types/types.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => async (action) => {
		if (
			isRejected(action) &&
			action.error.message === ErrorMessage.UNAUTHORIZED
		) {
			await storage.drop(StorageKey.TOKEN);

			return next(action);
		}

		if (isRejected(action)) {
			const error = action.error as MiddlewareError;
			notification.error(error.data ? error.data.message : error.message);
		}

		return next(action);
	};
};

export { handleErrorMiddleware };
