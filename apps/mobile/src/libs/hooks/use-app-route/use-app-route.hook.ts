import { useRoute } from "@react-navigation/native";

import { type NavigationScreenProperties } from "~/libs/types/types";

const useAppRoute = <T extends NavigationScreenProperties>(): T["route"] => {
	return useRoute<T["route"]>();
};

export { useAppRoute };
