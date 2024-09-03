import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserForgotPasswordValidationDto = {
	email: z.ZodString;
};

const userForgotPassword = z
	.object<UserForgotPasswordValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
	})
	.required();

export { userForgotPassword };
