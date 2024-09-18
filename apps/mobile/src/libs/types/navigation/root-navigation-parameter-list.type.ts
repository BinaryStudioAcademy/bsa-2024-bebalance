import { type RootScreenName } from "~/libs/enums/enums";

type RootNavigationParameterList = {
	[RootScreenName.BOTTOM_TABS_NAVIGATOR]: undefined;
	[RootScreenName.FORGOT_PASSWORD]: undefined;
	[RootScreenName.QUESTIONS_STACK]: undefined;
	[RootScreenName.RESET_PASSWORD]: { token: string } | undefined;
	[RootScreenName.SIGN_IN]: undefined;
	[RootScreenName.SIGN_UP]: undefined;
};

export { type RootNavigationParameterList };
