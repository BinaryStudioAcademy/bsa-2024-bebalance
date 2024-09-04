import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserUpdateRequestValidationDto = {
	name: z.ZodString;
};

const userUpdate = z
	.object<UserUpdateRequestValidationDto>({
		name: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.NAME_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.NAME_INVALID_CHARACTERS,
			}),
	})
	.required();

export { userUpdate };
