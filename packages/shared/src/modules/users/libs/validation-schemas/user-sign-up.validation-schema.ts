import { z } from "zod";

import { CONFIRM_PASSWORD_KEY } from "../constants/constants.js";
import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	confirmPassword: z.ZodString;
	email: z.ZodString;
	name: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		confirmPassword: z.string().trim(),
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		name: z.string().trim().min(UserValidationRule.NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.NAME_REQUIRE,
		}),
		password: z
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
	.required()
	.refine((data) => data.password === data.confirmPassword, {
		message: UserValidationMessage.PASSWORDS_MISSMATCH,
		path: [CONFIRM_PASSWORD_KEY],
	});

export { userSignUp };
