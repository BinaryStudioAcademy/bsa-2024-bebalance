import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRE: "Email is required",
	EMAIL_TAKEN: "Email is taken",
	EMAIL_WRONG: "Email is wrong",
	NAME_REQUIRE: "Name is required",
	PASSWORD_REQUIRE: "Password is not allowed to be empty",
	PASSWORD_SHORT: `Password length must be at least ${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)} characters long`,
} as const;

export { UserValidationMessage };
