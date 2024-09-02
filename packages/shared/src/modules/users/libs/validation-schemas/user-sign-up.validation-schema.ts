import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	name: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		email: z
			.string()
			.trim()
			.max(UserValidationRule.EMAIL_MAX_LENGTH, {
				message: UserValidationMessage.EMAIL_MAX_LENGTH,
			})
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_VALID_CHARS, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_LENGTH, {
				message: UserValidationMessage.EMAIL_LOCAL_PART_MAX_LENGTH,
			})
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_LENGTH, {
				message: UserValidationMessage.EMAIL_DOMAIN_PART_MAX_LENGTH,
			}),
		name: z
			.string()
			.trim()
			.min(UserValidationRule.NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.NAME_REQUIRE,
			})
			.max(UserValidationRule.NAME_MAX_LENGTH, {
				message: UserValidationMessage.NAME_MAX_LENGTH,
			})
			.regex(UserValidationRegexRule.NAME_VALID_CHARS, {
				message: UserValidationMessage.NAME_INVALID_CHARACTERS,
			}),
		password: z
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

export { userSignUp };
