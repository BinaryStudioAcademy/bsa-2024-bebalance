import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_DOMAIN_PART_MAX_LENGTH: `The domain part of the email address must be at most ${String(
		UserValidationRule.EMAIL_DOMAIN_PART_MAX_LENGTH,
	)} characters long`,
	EMAIL_LOCAL_PART_MAX_LENGTH: `The local part of the email address must be at most ${String(
		UserValidationRule.EMAIL_LOCAL_PART_MAX_LENGTH,
	)} characters long`,
	EMAIL_MAX_LENGTH: `Email must be at most ${String(
		UserValidationRule.EMAIL_MAX_LENGTH,
	)} characters long`,
	EMAIL_REQUIRE: "Email is required",
	EMAIL_TAKEN: "Email is taken",
	EMAIL_WRONG: "Please enter a valid email address",
	NAME_INVALID_CHARACTERS:
		"Please enter a valid name. Only letters, numbers, hyphens, and underscores are allowed",
	NAME_MAX_LENGTH: `Name must be at most ${String(
		UserValidationRule.NAME_MAX_LENGTH,
	)} characters long`,
	NAME_REQUIRE: "Name is required",
	PASSWORD_INVALID_CHARACTERS:
		"Your password contains invalid characters. Only letters, numbers, and ! @ # $ symbols are allowed",
	PASSWORD_MAX_LENGTH: `Password must be at most ${String(
		UserValidationRule.PASSWORD_MAX_LENGTH,
	)} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${String(
		UserValidationRule.PASSWORD_MIN_LENGTH,
	)} characters long`,
	PASSWORD_REQUIRE: "Password is not allowed to be empty",
	PASSWORD_REQUIRES_LETTER_AND_NUMBER:
		"Password must include at least one letter and one number",
} as const;

export { UserValidationMessage };
