import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { DEFAULT_ERROR_MESSAGE } from "~/libs/packages/toast-message/libs/constants/constants";
import { toastMessage } from "~/libs/packages/toast-message/toast-message";

type MiddlewareError = {
	data?: { message: string };
	message?: string;
};

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			const error = action.error as MiddlewareError;
			toastMessage.error({
				message: error.data?.message ?? error.message ?? DEFAULT_ERROR_MESSAGE,
			});
		}
		return next(action);
	};
};

export { handleErrorMiddleware };
