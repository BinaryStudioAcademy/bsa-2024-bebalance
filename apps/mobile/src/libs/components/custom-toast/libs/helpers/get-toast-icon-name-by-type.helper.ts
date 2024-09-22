import { ToastMessageType } from "~/libs/enums/enums";
import { type IconName, type ValueOf } from "~/libs/types/types";

const getToastIconNameByType = (
	type: ValueOf<typeof ToastMessageType>,
): IconName => {
	switch (type) {
		case ToastMessageType.ERROR: {
			return "highlight-off";
		}

		case ToastMessageType.SUCCESS: {
			return "check-circle-outline";
		}

		default: {
			return "flag-circle";
		}
	}
};

export { getToastIconNameByType };
