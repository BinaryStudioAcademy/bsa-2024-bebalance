import { type QuestionsStackName } from "~/libs/enums/enums";

type RootStackParameterList = {
	[QuestionsStackName.NOTIFICATION_QUESTIONS]: undefined;
	[QuestionsStackName.WHEEL_LOADING]: undefined;
};

export { type RootStackParameterList };
