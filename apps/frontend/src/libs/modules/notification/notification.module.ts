import { toast } from "react-toastify";

import { DEFAULT_ERROR_MESSAGE } from "./libs/constants/constants.js";

class Notification {
	public error(message = DEFAULT_ERROR_MESSAGE) {
		toast.error(message);
	}

	public info(message: string) {
		toast.info(message);
	}

	public success(message: string) {
		toast.success(message);
	}

	public warn(message: string) {
		toast.warn(message);
	}
}

export { Notification };
