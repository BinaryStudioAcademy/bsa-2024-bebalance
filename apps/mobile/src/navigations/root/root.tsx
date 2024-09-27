import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { actions as authActions } from "~/slices/auth/auth";
import { actions as taskActions } from "~/slices/task/task";

import { useConditionalScreens } from "./libs/hooks/hooks";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	const dispatch = useAppDispatch();
	const filteredScreens = useConditionalScreens();

	const user = useAppSelector(({ auth }) => auth.user);

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			void dispatch(taskActions.getCurrentTasks());
		}
	}, [dispatch, user]);

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
