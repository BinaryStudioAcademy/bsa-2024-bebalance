import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

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
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		name: z.string().trim().min(UserValidationRule.EMAIL_REQUIRE, {
			message: UserValidationMessage.NAME_REQUIRE,
		}),
		password: z.string().trim(),
	})
	.required();

export { userSignUp };
