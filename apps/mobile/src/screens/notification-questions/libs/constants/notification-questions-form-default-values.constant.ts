import { NotificationFrequency } from "~/packages/users/users";

import { Week } from "../enums/enums";
import { type NotificationQuestionsFormValues } from "../types/types";

const NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES: NotificationQuestionsFormValues =
	{
		notificationFrequency: NotificationFrequency.ALL,
		userTaskDays: [Week.MONDAY, Week.TUESDAY, Week.WEDNESDAY],
	};

export { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES };
