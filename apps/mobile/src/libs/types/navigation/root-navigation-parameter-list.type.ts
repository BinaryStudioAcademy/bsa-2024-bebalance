import { type RootScreenName } from "~/libs/enums/enums";

type RootNavigationParameterList = {
	[RootScreenName.CHAT]: undefined;
	[RootScreenName.BOTTOM_TABS_NAVIGATOR]: undefined;
	[RootScreenName.QUIZ_ENTRY]: undefined;
	[RootScreenName.SIGN_IN]: undefined;
	[RootScreenName.SIGN_UP]: undefined;
	[RootScreenName.WELCOME]: undefined;
};

export { type RootNavigationParameterList };
