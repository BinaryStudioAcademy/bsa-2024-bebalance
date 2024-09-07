import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationFrequency } from "../enums/enums.js";

type NotificationAnswersPayloadDto = {
	notificationFrequency: ValueOf<typeof NotificationFrequency>;
	userTaskDays: number[];
};

export { type NotificationAnswersPayloadDto };
