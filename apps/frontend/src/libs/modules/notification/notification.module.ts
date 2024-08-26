import { toast } from "react-toastify";

import { DEFAULT_ERROR_MESSAGE } from "./libs/constants/constants.js";

class Notification {
	public error(message = DEFAULT_ERROR_MESSAGE): void {
		toast.error(message);
	}

	public info(message: string): void {
		toast.info(message);
	}

	public success(message: string): void {
		toast.success(message);
	}

	public warn(message: string): void {
		toast.warn(message);
	}
}

export { Notification };
