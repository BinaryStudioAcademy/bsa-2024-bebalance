import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootScreenName } from "~/libs/enums/enums";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { NotificationQuestions } from "~/screens/notification-questions/notification-questions";
import { QuizEntry } from "~/screens/quiz-entry/quiz-entry";
import { Quiz } from "~/screens/quiz/quiz";
import { WheelLoading } from "~/screens/wheel-loading/wheel-loading";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const QuizStack: React.FC = () => {
	return (
		<NativeStack.Navigator>
			<NativeStack.Screen
				component={QuizEntry}
				name={RootScreenName.QUIZ_ENTRY}
			/>
			<NativeStack.Screen component={Quiz} name={RootScreenName.QUIZ} />
			<NativeStack.Screen
				component={NotificationQuestions}
				name={RootScreenName.NOTIFICATION_QUESTIONS}
			/>
			<NativeStack.Screen
				component={WheelLoading}
				name={RootScreenName.WHEEL_LOADING}
			/>
		</NativeStack.Navigator>
	);
};

export { QuizStack };
