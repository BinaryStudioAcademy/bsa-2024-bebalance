import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { notification } from "~/libs/modules/notification/notification.js";

import { type MiddlewareError } from "./libs/types/types.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			const error = action.error as MiddlewareError;
			notification.error(error.data ? error.data.message : error.message);
		}

		return next(action);
	};
};

export { handleErrorMiddleware };
