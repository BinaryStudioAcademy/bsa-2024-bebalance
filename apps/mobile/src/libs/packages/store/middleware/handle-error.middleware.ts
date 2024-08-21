import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { notification } from "~/libs/packages/notification/notifications";

type MiddlewareError = {
	data?: { message: string };
	message?: string;
};

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
