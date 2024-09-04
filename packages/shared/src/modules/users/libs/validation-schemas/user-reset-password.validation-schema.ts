import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	newPassword: z.ZodString;
};

const userResetPassword = z
	.object<UserSignInRequestValidationDto>({
		newPassword: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MIN_LENGTH, {
				message: UserValidationMessage.PASSWORD_MIN_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAX_LENGTH, {
				message: UserValidationMessage.PASSWORD_MAX_LENGTH,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS, {
				message: UserValidationMessage.PASSWORD_INVALID_CHARACTERS,
			})
			.regex(UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_AND_NUMBER, {
				message: UserValidationMessage.PASSWORD_REQUIRES_LETTER_AND_NUMBER,
			}),
	})
	.required();

export { userResetPassword };
