import { z } from "zod";

import {
	FinalAnswersValidationRule,
	UserValidationMessage,
} from "../enums/enums.js";

const finalAnswers = z.object({
	allowNotifications: z
		.string()
		.min(FinalAnswersValidationRule.ALLOW_NOTIFICATIONS_MIN_LENGTH, {
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
						day >= FinalAnswersValidationRule.TASK_DAY_MIN &&
						day <= FinalAnswersValidationRule.TASK_DAY_MAX,
				),
			{
				message: UserValidationMessage.DAYS_BETWEEN_1_AND_7,
			},
		),
});

export { finalAnswers };
