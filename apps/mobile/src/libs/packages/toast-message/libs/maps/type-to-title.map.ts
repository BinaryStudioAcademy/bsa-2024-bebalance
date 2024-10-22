import { ToastMessageTitle, ToastMessageType } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

const typeToTitle: Record<
	ValueOf<typeof ToastMessageType>,
	ValueOf<typeof ToastMessageTitle>
> = {
	[ToastMessageType.ERROR]: ToastMessageTitle.ERROR,
	[ToastMessageType.INFO]: ToastMessageTitle.INFO,
	[ToastMessageType.SUCCESS]: ToastMessageTitle.SUCCESS,
};

export { typeToTitle };
