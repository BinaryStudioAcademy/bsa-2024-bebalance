import {
	type NavigationProp,
	type ParamListBase,
	type RouteProp,
} from "@react-navigation/native";

type NavigationScreenProperties = {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
};

export { type NavigationScreenProperties };
