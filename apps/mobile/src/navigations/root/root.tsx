import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { ProtectedRoute } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { Auth } from "~/screens/auth/auth";
import { WelcomeScreen } from "~/screens/welcome-screen/welcome-screen";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	return (
		<NativeStack.Navigator screenOptions={screenOptions}>
			<NativeStack.Screen component={Auth} name={RootScreenName.SIGN_IN} />
			<NativeStack.Screen component={Auth} name={RootScreenName.SIGN_UP} />
			<NativeStack.Screen
				component={() => (
					<ProtectedRoute>
						<WelcomeScreen />
					</ProtectedRoute>
				)}
				name={RootScreenName.WELCOME}
			/>
		</NativeStack.Navigator>
	);
};

export { Root };
