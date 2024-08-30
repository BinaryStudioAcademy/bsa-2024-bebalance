import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	newPassword: z.ZodString;
};

const userResetPassword = z
	.object<UserSignInRequestValidationDto>({
		newPassword: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.PASSWORD_REQUIRE,
			})
			.max(UserValidationRule.PASSWORD_MAX_LENGTH, {
				message: UserValidationMessage.PASSWORD_MAX_LENGTH,
			})
			.min(UserValidationRule.PASSWORD_MIN_LENGTH, {
				message: UserValidationMessage.PASSWORD_MIN_LENGTH,
			}),
	})
	.required();

export { userResetPassword };
