import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserUpdatePasswordRequestValidationDto = {
	currentPassword: z.ZodString;
	newPassword: z.ZodString;
};

const userUpdatePassword = z
	.object<UserUpdatePasswordRequestValidationDto>({
		currentPassword: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS, {
				message: UserValidationMessage.PASSWORD_INVALID_CHARACTERS,
			})
			.regex(
				UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH,
				{
					message: UserValidationMessage.PASSWORD_REQUIRES_CHARACTER,
				},
			),
		newPassword: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS, {
				message: UserValidationMessage.PASSWORD_INVALID_CHARACTERS,
			})
			.regex(
				UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH,
				{
					message: UserValidationMessage.PASSWORD_REQUIRES_CHARACTER,
				},
			),
	})
	.required();

export { userUpdatePassword };
