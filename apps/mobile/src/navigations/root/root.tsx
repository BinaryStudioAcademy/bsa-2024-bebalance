import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { actions as authActions } from "~/slices/auth/auth";

import { useConditionalScreens } from "./libs/hooks/hooks";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	const dispatch = useAppDispatch();

	const hasAnsweredQuizQuestions = Boolean(user?.hasAnsweredQuizQuestions);
	const hasUser = Boolean(user);

	const filteredScreens = useConditionalScreens({
		hasAnsweredQuizQuestions,
		hasUser,
	});

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
