import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserUpdateRequestValidationDto = {
	name: z.ZodString;
};

const userUpdate = z
	.object<UserUpdateRequestValidationDto>({
		name: z.string().trim().min(UserValidationRule.NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.NAME_REQUIRE,
		}),
	})
	.required();

export { userUpdate };
