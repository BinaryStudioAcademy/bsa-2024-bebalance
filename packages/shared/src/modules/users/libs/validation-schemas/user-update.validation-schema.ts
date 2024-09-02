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
			.min(UserValidationRule.NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.NAME_REQUIRE,
			})
			.max(UserValidationRule.NAME_MAX_LENGTH, {
				message: UserValidationMessage.NAME_MAX_LENGTH,
			})
			.regex(UserValidationRegexRule.NAME_VALID_CHARS, {
				message: UserValidationMessage.NAME_INVALID_CHARACTERS,
			}),
	})
	.required();

export { userUpdate };
