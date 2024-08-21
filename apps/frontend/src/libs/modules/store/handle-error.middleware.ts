import type { Middleware } from "@reduxjs/toolkit";

import { isRejected } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";

import { MiddlewareError } from "./libs/types/types.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			const error = action.error as MiddlewareError;
			notification.error(
				error.data
					? error.data.message
					: (error.message ?? ErrorMessage.UNEXPECTED_ERROR),
			);
		}
		return next(action);
	};
};

export { handleErrorMiddleware };
