import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { useAppDispatch, useEffect } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { actions as authActions } from "~/slices/auth/auth";

import { useConditionalScreens } from "./libs/hooks/hooks";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	const dispatch = useAppDispatch();
	const filteredScreens = useConditionalScreens();

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	return (
		<NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
			{filteredScreens.map((screen) => {
				return (
					<NativeStack.Screen
						component={screen.component}
						key={screen.name}
						name={screen.name}
					/>
				);
			})}
		</NativeStack.Navigator>
	);
};

export { Root };
