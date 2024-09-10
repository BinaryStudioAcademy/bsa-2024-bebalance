import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationFrequency } from "../enums/enums.js";

type UserDto = {
	createdAt: string;
	email: string;
	id: number;
	name: string;
	notificationFrequency?: ValueOf<typeof NotificationFrequency>;
	onBoardingAnswers?: number[];
	updatedAt: string;
	userTaskDays?: number[];
};

export { type UserDto };
