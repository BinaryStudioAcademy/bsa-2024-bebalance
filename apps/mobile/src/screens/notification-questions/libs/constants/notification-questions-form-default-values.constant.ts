import { type NotificationQuestionsFormValues } from "~/libs/types/types";
import { NotificationFrequency } from "~/packages/users/users";

import { DayOfWeek } from "../enums/enums";

const NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES: NotificationQuestionsFormValues =
	{
		notificationFrequency: NotificationFrequency.ALL,
		userTaskDays: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY],
	};

export { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES };
