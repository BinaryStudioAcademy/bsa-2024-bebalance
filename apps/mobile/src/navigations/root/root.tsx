import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { RootScreenName } from "~/libs/enums/enums";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { Auth } from "~/screens/auth/auth";
import { WelcomeScreen } from "~/screens/welcome-screen/welcome-screen";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	// const user = useAppSelector(({ auth }) => auth.user);

	const user = "User";
	const hasUser = Boolean(user);

	return (
		<NativeStack.Navigator screenOptions={screenOptions}>
			{hasUser ? (
				<NativeStack.Screen
					component={WelcomeScreen}
					name={RootScreenName.WELCOME}
				/>
			) : (
				<NativeStack.Group>
					<NativeStack.Screen component={Auth} name={RootScreenName.SIGN_IN} />
					<NativeStack.Screen component={Auth} name={RootScreenName.SIGN_UP} />
				</NativeStack.Group>
			)}
		</NativeStack.Navigator>
	);
};

export { Root };
