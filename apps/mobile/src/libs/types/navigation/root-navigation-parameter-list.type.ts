import { type RootScreenName } from "~/libs/enums/enums";

type RootNavigationParameterList = {
	[RootScreenName.SIGN_IN]: undefined;
	[RootScreenName.SIGN_UP]: undefined;
	[RootScreenName.WELCOME]: undefined;
};

export { type RootNavigationParameterList };
