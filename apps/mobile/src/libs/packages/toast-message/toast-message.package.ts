import Toast from "react-native-toast-message";
import { type ValueOf } from "shared";

import { ToastMessageTitle, ToastMessageType } from "~/libs/enums/enums";

import { DEFAULT_ERROR_MESSAGE } from "./libs/constants/constants";
import { typeToTitle } from "./libs/maps/maps";

type ErrorProperties = {
	message?: string | undefined;
	title?: ValueOf<typeof ToastMessageTitle>;
};

type Properties = {
	message: string;
	title?: ValueOf<typeof ToastMessageTitle>;
};

class ToastMessage {
	private showToast(
		{ message, title }: ErrorProperties | Properties,
		type: ValueOf<typeof ToastMessageType>,
	): void {
		Toast.show({
			text1: title ?? typeToTitle[type],
			text2: message ?? DEFAULT_ERROR_MESSAGE,
			type: type,
		});
	}

	public error(properties: ErrorProperties = {}): void {
		this.showToast(properties, ToastMessageType.ERROR);
	}

	public info(properties: Properties): void {
		this.showToast(properties, ToastMessageType.INFO);
	}

	public success(properties: Properties): void {
		this.showToast(properties, ToastMessageType.SUCCESS);
	}
}

export { ToastMessage };
