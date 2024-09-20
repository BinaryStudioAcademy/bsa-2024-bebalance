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
		.min(NotificationAnswersValidationRule.NOTIFICATION_FREQUENCY_MIN_LENGTH, {
			message: UserValidationMessage.MIN_3_DAYS,
		})
		.max(NotificationAnswersValidationRule.TASK_DAY_MAX, {
			message: UserValidationMessage.MAX_7_DAYS,
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
		)
		.refine((days) => new Set(days).size === days.length, {
			message: UserValidationMessage.DAYS_UNIQUE,
		}),
});

export { notificationAnswers };
