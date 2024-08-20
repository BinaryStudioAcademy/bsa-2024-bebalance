import type { Middleware } from "@reduxjs/toolkit";

import { isRejected } from "@reduxjs/toolkit";

import { toast } from "~/libs/modules/toast/toast.js";

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			const error = action.error as {
				data?: { message: string };
				message?: string;
			};
			toast.error(error.data ? error.data.message : error.message);
		}
		return next(action);
	};
};

export { handleErrorMiddleware };
