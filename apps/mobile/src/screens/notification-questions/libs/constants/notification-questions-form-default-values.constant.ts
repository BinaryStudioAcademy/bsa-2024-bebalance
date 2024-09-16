import { NotificationFrequency } from "~/packages/users/users";

import { type NotificationQuestionsFormValues } from "../types/types";

const NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES: NotificationQuestionsFormValues =
	{
		notificationFrequency: NotificationFrequency.NONE,
		userTaskDays: [],
	};

export { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES };
