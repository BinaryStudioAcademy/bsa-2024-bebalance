import { RootScreenName } from "~/libs/enums/enums";
import { type NavigationItem } from "~/libs/types/types";
import { BottomTabsNavigator, QuestionsStack } from "~/navigations/navigations";
import { Auth } from "~/screens/auth/auth";
import { useMemo } from "~/libs/hooks/hooks";

type Properties = {
	hasAnsweredQuizQuestions: boolean;
	hasUser: boolean;
};

const useConditionalScreens = ({
	hasAnsweredQuizQuestions,
	hasUser,
}: Properties): NavigationItem[] => {
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
		];

		return screens.filter((screen) => screen.shouldBeRendered);
	}, [hasUser, hasAnsweredQuizQuestions]);
};

export { useConditionalScreens };
