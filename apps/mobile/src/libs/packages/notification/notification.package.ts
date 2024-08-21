import Toast from "react-native-toast-message";

import {
	DEFAULT_ERROR_MESSAGES,
	DEFAULT_ERROR_TITLE,
} from "./libs/constants/constant";

class Notification {
	public error(
		title: string = DEFAULT_ERROR_TITLE,
		text: string = DEFAULT_ERROR_MESSAGES,
	) {
		Toast.show({
			text1: title,
			text2: text,
			type: "error",
		});
	}

	public info(title: string, text: string) {
		Toast.show({
			text1: title,
			text2: text,
			type: "info",
		});
	}

	public success(title: string, text: string) {
		Toast.show({
			text1: title,
			text2: text,
			type: "success",
		});
	}
}

export { Notification };
