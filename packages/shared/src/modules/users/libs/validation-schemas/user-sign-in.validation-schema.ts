import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignIn = z
	.object<UserSignInRequestValidationDto>({
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
			.regex(/^[\w!#$&'*+.=–]+(?:\.[\w!#$&'*+=–]+)*(?=@)/, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(/(?<=@)(?!.*[.-]{2})[\w!#$&'*+.=–-]*/, {
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(
				new RegExp(
					`^[\\w*#$!=&'_+–.]{1,${String(UserValidationRule.EMAIL_LOCAL_PART_MAX_LENGTH)}}(?=@)`,
				),
				{
					message: UserValidationMessage.EMAIL_LOCAL_PART_MAX_LENGTH,
				},
			)
			.regex(
				new RegExp(
					`(?<=@)[\\w*#$!=&'_+–.-]{3,${String(UserValidationRule.EMAIL_DOMAIN_PART_MAX_LENGTH)}}$`,
				),
				{
					message: UserValidationMessage.EMAIL_DOMAIN_PART_MAX_LENGTH,
				},
			),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MIN_LENGTH, {
				message: UserValidationMessage.PASSWORD_MIN_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAX_LENGTH, {
				message: UserValidationMessage.PASSWORD_MAX_LENGTH,
			})
			.regex(/^(?=.*[A-Za-z])(?=.*\d)[\d!#$@A-Za-z]*$/, {
				message: UserValidationMessage.PASSWORD_INVALID_CHARACTERS,
			}),
	})
	.required();

export { userSignIn };
