import { type RootNavigationParameterList } from "./root-navigation-parameter-list.type";

type NavigationItem = {
	shouldBeRendered: boolean;
	component: React.ComponentType;
	name: keyof RootNavigationParameterList;
};

export { type NavigationItem };
