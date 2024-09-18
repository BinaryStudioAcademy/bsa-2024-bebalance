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
	hasUser,
	hasAnsweredQuizQuestions,
}: Properties): NavigationItem[] => {
	return useMemo(() => {
		const screens: NavigationItem[] = [
			{
				shouldBeRendered: hasUser && !hasAnsweredQuizQuestions,
				component: QuestionsStack,
				name: RootScreenName.QUESTIONS_STACK,
			},
			{
				shouldBeRendered: hasUser && hasAnsweredQuizQuestions,
				component: BottomTabsNavigator,
				name: RootScreenName.BOTTOM_TABS_NAVIGATOR,
			},
			{
				shouldBeRendered: !hasUser,
				component: Auth,
				name: RootScreenName.SIGN_IN,
			},
			{
				shouldBeRendered: !hasUser,
				component: Auth,
				name: RootScreenName.SIGN_UP,
			},
		];

		return screens.filter((screen) => screen.shouldBeRendered);
	}, [hasUser, hasAnsweredQuizQuestions]);
};

export { useConditionalScreens };
