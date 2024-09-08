import { z } from "zod";

import {
	NotificationAnswersValidationRule,
	NotificationFrequency,
	UserValidationMessage,
} from "../enums/enums.js";

const notificationAnswers = z.object({
	notificationFrequency: z.nativeEnum(NotificationFrequency, {
		required_error:
			UserValidationMessage.NOTIFICATION_FREQUENCY_STRING_REQUIRED,
	}),
	userTaskDays: z
		.array(
			z.number({
				required_error: UserValidationMessage.TASK_DAY_REQUIRED,
			}),
		)
		.nonempty({
			message: UserValidationMessage.DAYS_BETWEEN_1_AND_7,
		})
		.refine(
			(days) =>
				days.every(
					(day) =>
						day >= NotificationAnswersValidationRule.TASK_DAY_MIN &&
						day <= NotificationAnswersValidationRule.TASK_DAY_MAX,
				),
			{
				message: UserValidationMessage.DAYS_BETWEEN_1_AND_7,
			},
		),
});

export { notificationAnswers };
