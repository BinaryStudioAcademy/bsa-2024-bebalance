import { type RootNavigationParameterList } from "./root-navigation-parameter-list.type";

type NavigationItem = {
	component: React.ComponentType;
	name: keyof RootNavigationParameterList;
	shouldBeRendered: boolean;
};

export { type NavigationItem };
