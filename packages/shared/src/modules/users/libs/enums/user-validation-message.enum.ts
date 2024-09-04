import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRE: "Email is required",
	EMAIL_TAKEN: "This email is already registered. Please use a different email",
	EMAIL_WRONG: "Please enter a valid email address",
	FIELD_REQUIRED: "This field is required",
	NAME_INVALID_CHARACTERS: `Please enter a valid name. Your name must be between ${String(UserValidationRule.NAME_MIN_LENGTH)} and ${String(UserValidationRule.NAME_MAX_LENGTH)} characters. Only Latin letters, numbers, hyphens, and underscores are allowed`,
	PASSWORD_INVALID_CHARACTERS:
		"Your password contains invalid characters. Only letters, numbers, and ! @ # $ symbols are allowed",
	PASSWORD_MAX_LENGTH: `Password must be at most ${String(
		UserValidationRule.PASSWORD_MAX_LENGTH,
	)} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${String(
		UserValidationRule.PASSWORD_MIN_LENGTH,
	)} characters long`,
	PASSWORD_REQUIRES_CHARACTER: `Your password must be between ${String(UserValidationRule.PASSWORD_MIN_LENGTH)} and ${String(UserValidationRule.PASSWORD_MAX_LENGTH)} characters, and include at least one letter and one number`,
	PASSWORD_REQUIRES_LETTER_AND_NUMBER:
		"Password must include at least one letter and one number",
} as const;

export { UserValidationMessage };
