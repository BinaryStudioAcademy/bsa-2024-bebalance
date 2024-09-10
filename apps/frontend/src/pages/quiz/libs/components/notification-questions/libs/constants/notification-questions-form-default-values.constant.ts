import { type NotificationQuestionsFormValues } from "~/libs/types/types.js";
import { NotificationFrequency } from "~/modules/users/users.js";

const NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES: NotificationQuestionsFormValues =
	{
		notificationFrequency: NotificationFrequency.NONE,
		userTaskDays: [],
	};

export { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES };
