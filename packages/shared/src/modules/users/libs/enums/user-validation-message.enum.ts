import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	BOOLEAN_REQUIRED: "Allow notifications must be a boolean value",
	DAYS_BETWEEN_1_AND_7: "Each day must be between 1 and 7",
	EMAIL_REQUIRE: "Email is required",
	EMAIL_TAKEN: "Email is taken",
	EMAIL_WRONG: "Email is wrong",
	NAME_REQUIRE: "Name is required",
	PASSWORD_MAX_LENGTH: `Password must be at most ${String(
		UserValidationRule.PASSWORD_MAX_LENGTH,
	)} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${String(
		UserValidationRule.PASSWORD_MIN_LENGTH,
	)} characters long`,
	PASSWORD_REQUIRE: "Password is not allowed to be empty",
	PASSWORD_SHORT: "Password length must be at least 8 characters long",
	TASK_DAY_REQUIRED: "Task day must be a number",
	USER_ID_REQUIRED: "User ID is required",
} as const;

export { UserValidationMessage };
