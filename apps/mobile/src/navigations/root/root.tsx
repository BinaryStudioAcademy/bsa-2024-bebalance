import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";

import { RootScreenName } from "~/libs/enums/enums";
import { useAppSelector } from "~/libs/hooks/hooks";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { BottomTabsNavigator } from "~/navigations/bottom-tabs-navigator/bottom-tabs-navigator";
import { Auth } from "~/screens/auth/auth";
import { NotificationQuestions } from "~/screens/notification-questions/notification-questions";
import { Onboarding } from "~/screens/onboarding/onboarding";
import { Quiz } from "~/screens/quiz/quiz";
import { QuizEntry } from "~/screens/quiz-entry/quiz-entry";
import { Welcome } from "~/screens/welcome/welcome";
import { WheelLoading } from "~/screens/wheel-loading/wheel-loading";

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
						component={NotificationQuestions}
						name={RootScreenName.NOTIFICATION_QUESTIONS}
					/>
					<NativeStack.Screen
						component={Onboarding}
						name={RootScreenName.ONBOARDING}
					/>
					<NativeStack.Screen
						component={Welcome}
						name={RootScreenName.WELCOME}
					/>
					<NativeStack.Screen
						component={QuizEntry}
						name={RootScreenName.QUIZ_ENTRY}
					/>
					<NativeStack.Screen component={Quiz} name={RootScreenName.QUIZ} />
					<NativeStack.Screen
						component={WheelLoading}
						name={RootScreenName.WHEEL_LOADING}
					/>
					<NativeStack.Screen
						component={BottomTabsNavigator}
						name={RootScreenName.BOTTOM_TABS_NAVIGATOR}
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
