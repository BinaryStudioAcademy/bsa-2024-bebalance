import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { type ReactNode } from "react";

import { RootScreenName } from "~/libs/enums/enums";
import { useEffect, useNavigation } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";

type Properties = {
	children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
	// const { authenticatedUser } = useAppSelector(({ auth }) => {
	// 	return {
	// 		authenticatedUser: auth.authenticatedUser,
	// 	};
	// });
	const authenticatedUser = "User";
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const hasUser = Boolean(authenticatedUser);

	useEffect(() => {
		if (!hasUser) {
			navigation.navigate(RootScreenName.SIGN_IN);
		}
	}, [hasUser, navigation]);

	return <>{children}</>;
};

export { ProtectedRoute };
