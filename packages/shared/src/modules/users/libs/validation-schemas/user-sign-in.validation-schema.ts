import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignIn = z
	.object<UserSignInRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		password: z
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

export { userSignIn };
