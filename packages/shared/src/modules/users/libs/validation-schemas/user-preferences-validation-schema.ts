import { z } from "zod";

import {
	UserPreferencesValidationRule,
	UserValidationMessage,
} from "../enums/enums.js";

const userPreferences = z.object({
	allowNotifications: z.boolean({
		required_error: UserValidationMessage.BOOLEAN_REQUIRED,
	}),
	userId: z.number({
		required_error: UserValidationMessage.USER_ID_REQUIRED,
	}),
	userTaskDays: z
		.array(
			z.number({
				required_error: UserValidationMessage.TASK_DAY_REQUIRED,
			}),
		)
		.refine(
			(days) =>
				days.every(
					(day) =>
						day >= UserPreferencesValidationRule.TASK_DAY_MIN &&
						day <= UserPreferencesValidationRule.TASK_DAY_MAX,
				),
			{
				message: UserValidationMessage.DAYS_BETWEEN_1_AND_7,
			},
		),
});

export { userPreferences };
