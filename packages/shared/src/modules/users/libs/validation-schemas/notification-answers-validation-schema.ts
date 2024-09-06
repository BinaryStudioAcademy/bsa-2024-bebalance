import { z } from "zod";

import {
	NotificationAnswersValidationRule,
	UserValidationMessage,
} from "../enums/enums.js";

const notificationAnswers = z.object({
	allowNotifications: z
		.string()
		.min(NotificationAnswersValidationRule.ALLOW_NOTIFICATIONS_MIN_LENGTH, {
			message: UserValidationMessage.ALLOW_NOTIFICATIONS_STRING_REQUIRED,
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
