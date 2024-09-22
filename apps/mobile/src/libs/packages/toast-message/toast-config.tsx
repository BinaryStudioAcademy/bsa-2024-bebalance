import { CustomToast } from "~/libs/components/custom-toast/custom-toast";
import { ToastMessageType } from "~/libs/enums/enums";
import { type ToastData, type ValueOf } from "~/libs/types/types";

const toastConfig: Record<
	ValueOf<typeof ToastMessageType>,
	(properties: ToastData) => JSX.Element
> = {
	error: (properties) => {
		return <CustomToast type={ToastMessageType.ERROR} {...properties} />;
	},
	info: (properties) => {
		return <CustomToast type={ToastMessageType.INFO} {...properties} />;
	},
	success: (properties) => {
		return <CustomToast type={ToastMessageType.SUCCESS} {...properties} />;
	},
};

export { toastConfig };
