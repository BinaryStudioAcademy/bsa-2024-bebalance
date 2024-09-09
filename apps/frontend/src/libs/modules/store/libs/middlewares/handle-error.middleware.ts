import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";

import { type ExtraArguments } from "../../store.js";
import { type MiddlewareError } from "../types/types.js";

type Properties = {
	action: unknown;
	extra: ExtraArguments;
	next: (action: unknown) => unknown;
};

const handleErrorMiddleware = async ({
	action,
	extra,
	next,
}: Properties): Promise<unknown> => {
	if (isRejected(action)) {
		switch (action.error.message) {
			case ErrorMessage.UNAUTHORIZED: {
				await extra.storage.drop(StorageKey.TOKEN);

				return next(action);
			}

			case ErrorMessage.RESET_PASSWORD_LINK_EXPIRED: {
				extra.notification.error(ErrorMessage.RESET_PASSWORD_LINK_EXPIRED);

				return next(action);
			}

			default: {
				const error = action.error as MiddlewareError;
				extra.notification.error(
					error.data ? error.data.message : error.message,
				);

				return next(action);
			}
		}
	}

	return next(action);
};

const createHandleErrorMiddleware = (extra: ExtraArguments): Middleware => {
	return () => {
		return (next) => {
			return async (action) => {
				await handleErrorMiddleware({ action, extra, next });
			};
		};
	};
};

export { createHandleErrorMiddleware };
