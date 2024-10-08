import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { NumericalValue, QuestionsStackName } from "~/libs/enums/enums";
import { useAppSelector } from "~/libs/hooks/hooks";
import { type QuestionsStackNavigationParameterList } from "~/libs/types/types";
import { Introduction } from "~/screens/introduction/introduction";
import { NotificationQuestions } from "~/screens/notification-questions/notification-questions";
import { Onboarding } from "~/screens/onboarding/onboarding";
import { Quiz } from "~/screens/quiz/quiz";
import { QuizEntry } from "~/screens/quiz-entry/quiz-entry";
import { Welcome } from "~/screens/welcome/welcome";
import { WheelLoading } from "~/screens/wheel-loading/wheel-loading";

const NativeStack =
	createNativeStackNavigator<QuestionsStackNavigationParameterList>();

const QuestionsStack: React.FC = () => {
	const hasAnsweredOnboardingQuestions = useAppSelector(
		({ auth }) => auth.user?.hasAnsweredOnboardingQuestions,
	);

	const hasNotificationDays = useAppSelector(
		({ auth }) => Number(auth.user?.userTaskDays?.length) > NumericalValue.ZERO,
	);
	const isRetakingQuiz = useAppSelector(({ quiz }) => quiz.isRetakingQuiz);

	return (
		<NativeStack.Navigator screenOptions={{ headerShown: false }}>
			{!hasAnsweredOnboardingQuestions && !isRetakingQuiz && (
				<>
					<NativeStack.Screen
						component={Introduction}
						name={QuestionsStackName.INTRODUCTION}
					/>
					<NativeStack.Screen
						component={Onboarding}
						name={QuestionsStackName.ONBOARDING}
					/>
					<NativeStack.Screen
						component={Welcome}
						name={QuestionsStackName.WELCOME}
					/>
				</>
			)}
			{!isRetakingQuiz && (
				<NativeStack.Screen
					component={QuizEntry}
					name={QuestionsStackName.QUIZ_ENTRY}
				/>
			)}
			<NativeStack.Screen component={Quiz} name={QuestionsStackName.QUIZ} />
			{!hasNotificationDays && (
				<>
					<NativeStack.Screen
						component={NotificationQuestions}
						name={QuestionsStackName.NOTIFICATION_QUESTIONS}
					/>
				</>
			)}
			<NativeStack.Screen
				component={WheelLoading}
				name={QuestionsStackName.WHEEL_LOADING}
			/>
		</NativeStack.Navigator>
	);
};

export { QuestionsStack };
