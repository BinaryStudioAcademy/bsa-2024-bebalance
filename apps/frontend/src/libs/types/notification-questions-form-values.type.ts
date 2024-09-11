import { type ValueOf } from "~/libs/types/types.js";
import { type NotificationFrequency } from "~/modules/users/users.js";

type NotificationQuestionsFormValues = {
	notificationFrequency: ValueOf<typeof NotificationFrequency>;
	userTaskDays: number[];
};

export { type NotificationQuestionsFormValues };
