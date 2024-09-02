import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	confirmPassword: z.ZodString;
	email: z.ZodString;
	name: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		confirmPassword: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			}),
		email: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		name: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.NAME_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.NAME_INVALID_CHARACTERS,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(
				UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH,
				{
					message: UserValidationMessage.PASSWORD_REQUIRES_CHARACTER,
				},
			)
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS, {
				message: UserValidationMessage.PASSWORD_INVALID_CHARACTERS,
			}),
	})
	.required()
	.superRefine(({ confirmPassword, password }, contex) => {
		if (confirmPassword !== password) {
			contex.addIssue({
				code: "custom",
				message: UserValidationMessage.PASSWORD_NOT_MATCH,
				path: ["confirmPassword"],
			});
		}
	});
export { userSignUp };
