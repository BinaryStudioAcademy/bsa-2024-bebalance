import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { RootScreenName } from "~/libs/enums/enums";
import { useAppSelector } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { Auth } from "~/screens/auth/auth";
import { QuizEntry } from "~/screens/quiz-entry/quiz-entry";
import { Welcome } from "~/screens/welcome/welcome";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
	headerShown: false,
};

const Root: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const hasUser = Boolean(user);

	return (
		<NativeStack.Navigator screenOptions={screenOptions}>
			{hasUser ? (
				<NativeStack.Group>
					<NativeStack.Screen
						component={Welcome}
						name={RootScreenName.WELCOME}
					/>
					<NativeStack.Screen
						component={QuizEntry}
						name={RootScreenName.QUIZ_ENTRY}
					/>
				</NativeStack.Group>
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
