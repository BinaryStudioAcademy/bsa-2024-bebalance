import type { Middleware } from "@reduxjs/toolkit";

import { isRejected } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			const error = action.error as {
				data?: { message: string };
				message?: string;
			};
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
