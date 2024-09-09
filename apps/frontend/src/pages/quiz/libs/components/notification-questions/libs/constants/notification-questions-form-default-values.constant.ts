import { NotificationFrequency } from "~/modules/users/users.js";
import { type NotificationQuestionsFormValues } from "~/pages/libs/types/types.js";

const NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES: NotificationQuestionsFormValues =
	{
		notificationFrequency: NotificationFrequency.NONE,
		userTaskDays: [],
	};

export { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES };
