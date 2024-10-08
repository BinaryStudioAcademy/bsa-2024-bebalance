import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationFrequency } from "../enums/enums.js";

type UserDto = {
	avatarFileId: null | number;
	avatarUrl: null | string;
	completionTasksPercentage: null | number;
	createdAt: string;
	email: string;
	hasAnsweredOnboardingQuestions: boolean;
	hasAnsweredQuizQuestions: boolean;
	id: number;
	name: string;
	notificationFrequency?: ValueOf<typeof NotificationFrequency>;
	updatedAt: string;
	userTaskDays?: number[];
};

export { type UserDto };
