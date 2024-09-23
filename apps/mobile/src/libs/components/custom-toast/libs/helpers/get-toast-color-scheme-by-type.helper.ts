import { BaseColor, ToastMessageType } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type ToastColorScheme = {
	primaryColor: ValueOf<typeof BaseColor>;
	secondaryColor: ValueOf<typeof BaseColor>;
};

const getToastColorSchemeByType = (
	type: ValueOf<typeof ToastMessageType>,
): ToastColorScheme => {
	switch (type) {
		case ToastMessageType.ERROR: {
			return {
				primaryColor: BaseColor.RED,
				secondaryColor: BaseColor.TRANSPARENT_RED,
			};
		}

		case ToastMessageType.SUCCESS: {
			return {
				primaryColor: BaseColor.GREEN,
				secondaryColor: BaseColor.TRANSPARENT_GREEN,
			};
		}

		default: {
			return {
				primaryColor: BaseColor.BLUE,
				secondaryColor: BaseColor.TRANSPARENT_BLUE,
			};
		}
	}
};

export { getToastColorSchemeByType };
