import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationFrequency } from "../enums/notification-frequency.enum.js";

type NotificationAnswersPayloadDto = {
	notificationFrequency: ValueOf<typeof NotificationFrequency>;
	userTaskDays: number[];
};

export { type NotificationAnswersPayloadDto };
