import Toast from "react-native-toast-message";

import { type ToastMessageTitle, ToastMessageType } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { typeToTitle } from "./libs/maps/maps";

type Properties = {
	message: string;
	title?: ValueOf<typeof ToastMessageTitle>;
};

class ToastMessage {
	private showToast(
		{ message, title }: Properties,
		type: ValueOf<typeof ToastMessageType>,
	): void {
		Toast.show({
			text1: title ?? typeToTitle[type],
			text2: message,
			type,
		});
	}

	public error(properties: Properties): void {
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
