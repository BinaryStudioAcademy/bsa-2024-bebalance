import { RootScreenName } from "~/libs/enums/enums";
import { type NavigationItem } from "~/libs/types/types";
import { BottomTabsNavigator, QuestionsStack } from "~/navigations/navigations";
import { Auth } from "~/screens/auth/auth";

const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		checkShouldBeRendered: ({ hasAnsweredQuizQuestions, hasUser }): boolean => {
			return hasUser && !hasAnsweredQuizQuestions;
		},
		component: QuestionsStack,
		name: RootScreenName.QUESTIONS_STACK,
	},
	{
		checkShouldBeRendered: ({ hasAnsweredQuizQuestions, hasUser }): boolean => {
			return hasUser && hasAnsweredQuizQuestions;
		},
		component: BottomTabsNavigator,
		name: RootScreenName.BOTTOM_TABS_NAVIGATOR,
	},
	{
		checkShouldBeRendered: ({ hasUser }): boolean => {
			return !hasUser;
		},
		component: Auth,
		name: RootScreenName.SIGN_IN,
	},
	{
		checkShouldBeRendered: ({ hasUser }): boolean => {
			return !hasUser;
		},
		component: Auth,
		name: RootScreenName.SIGN_UP,
	},
	{
		checkShouldBeRendered: ({ hasUser }): boolean => {
			return !hasUser;
		},
		component: Auth,
		name: RootScreenName.FORGOT_PASSWORD,
	},
	{
		checkShouldBeRendered: ({ hasUser }): boolean => {
			return !hasUser;
		},
		component: Auth,
		name: RootScreenName.RESET_PASSWORD,
	},
];

export { NAVIGATION_ITEMS };
