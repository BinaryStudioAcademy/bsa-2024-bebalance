import { RootScreenName } from "~/libs/enums/enums";
import { useAppSelector, useMemo } from "~/libs/hooks/hooks";
import { type NavigationItem } from "~/libs/types/types";
import { BottomTabsNavigator, QuestionsStack } from "~/navigations/navigations";
import { Auth } from "~/screens/auth/auth";

const useConditionalScreens = (): NavigationItem[] => {
	const user = useAppSelector(({ auth }) => auth.user);
	const hasAnsweredQuizQuestions = Boolean(user?.hasAnsweredQuizQuestions);
	const hasUser = Boolean(user);

	return useMemo(() => {
		const screens: NavigationItem[] = [
			{
				component: QuestionsStack,
				name: RootScreenName.QUESTIONS_STACK,
				shouldBeRendered: hasUser && !hasAnsweredQuizQuestions,
			},
			{
				component: BottomTabsNavigator,
				name: RootScreenName.BOTTOM_TABS_NAVIGATOR,
				shouldBeRendered: hasUser && hasAnsweredQuizQuestions,
			},
			{
				component: Auth,
				name: RootScreenName.SIGN_IN,
				shouldBeRendered: !hasUser,
			},
			{
				component: Auth,
				name: RootScreenName.SIGN_UP,
				shouldBeRendered: !hasUser,
			},
			{
				component: Auth,
				name: RootScreenName.FORGOT_PASSWORD,
				shouldBeRendered: !hasUser,
			},
			{
				component: Auth,
				name: RootScreenName.RESET_PASSWORD,
				shouldBeRendered: !hasUser,
			},
		];

		return screens.filter((screen) => screen.shouldBeRendered);
	}, [hasUser, hasAnsweredQuizQuestions]);
};

export { useConditionalScreens };
