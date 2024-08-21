import { toast } from "react-toastify";

import { DefaulteMessage } from "./libs/enums/enums.js";

class Notification {
	public error(message = DefaulteMessage.ERROR) {
		toast.error(message);
	}

	public info(message = DefaulteMessage.INFO) {
		toast.info(message);
	}

	public success(message = DefaulteMessage.SUCCESS) {
		toast.success(message);
	}

	public warn(message = DefaulteMessage.WARN) {
		toast.warn(message);
	}
}

export { Notification };
