import { type RootNavigationParameterList } from "./root-navigation-parameter-list.type";

type Properties = {
	hasAnsweredQuizQuestions: boolean;
	hasUser: boolean;
};

type NavigationItem = {
	checkShouldBeRendered: (properties: Properties) => boolean;
	component: React.ComponentType;
	name: keyof RootNavigationParameterList;
};

export { type NavigationItem };
