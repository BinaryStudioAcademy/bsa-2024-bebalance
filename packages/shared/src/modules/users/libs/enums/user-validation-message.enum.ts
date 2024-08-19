import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRE: "Email is required",
	EMAIL_WRONG: "Email is wrong",
	PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH.toString()} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH.toString()} characters long`,
} as const;

export { UserValidationMessage };
