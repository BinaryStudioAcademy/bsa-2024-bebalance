import { type BottomTabScreenName } from "~/libs/enums/enums";

type BottomTabNavigationParameterList = {
	[BottomTabScreenName.CHAT]: undefined;
	[BottomTabScreenName.SETTINGS]: undefined;
	[BottomTabScreenName.TASKS]: undefined;
	[BottomTabScreenName.WHEEL]: undefined;
};

export { type BottomTabNavigationParameterList };
