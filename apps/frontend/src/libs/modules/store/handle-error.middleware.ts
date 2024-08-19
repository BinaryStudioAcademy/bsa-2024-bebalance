import type { Middleware } from "@reduxjs/toolkit";

import { isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const handleErrorMiddleware: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			toast.error(
				"data" in action.error
					? (action.error.data as { message: string }).message
					: action.error.message,
			);
		}
		return next(action);
	};
};

export { handleErrorMiddleware };
