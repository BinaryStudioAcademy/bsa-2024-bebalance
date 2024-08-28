import { type IconName } from "~/libs/types/types";

const getSecurityInputIconName = (isInputHidden: boolean): IconName => {
	return isInputHidden ? "visibility" : "visibility-off";
};

export { getSecurityInputIconName };
