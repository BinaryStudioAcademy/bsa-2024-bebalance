import { toast } from "react-toastify";

class Notification {
	public error(message: string) {
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
