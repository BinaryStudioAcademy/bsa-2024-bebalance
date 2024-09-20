import { type QuestionsStackName } from "~/libs/enums/enums";

type QuestionsStackNavigationParameterList = {
	[QuestionsStackName.BOTTOM_TABS]: undefined;
	[QuestionsStackName.NOTIFICATION_QUESTIONS]: undefined;
	[QuestionsStackName.ONBOARDING]: undefined;
	[QuestionsStackName.QUIZ]: undefined;
	[QuestionsStackName.QUIZ_ENTRY]: undefined;
	[QuestionsStackName.WELCOME]: undefined;
	[QuestionsStackName.WHEEL_LOADING]: undefined;
};

export { type QuestionsStackNavigationParameterList };
