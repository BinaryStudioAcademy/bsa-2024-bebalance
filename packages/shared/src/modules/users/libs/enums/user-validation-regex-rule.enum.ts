import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationRegexRule = {
	EMAIL_DOMAIN_PART_VALID_CHARS:
		/^[^\s@]+@(?=.{4,35}$)[\dA-Za-z]+(?:-[\dA-Za-z]+)*\.[\dA-Za-z]{2,}$/,
	EMAIL_LOCAL_PART_VALID_CHARS:
		/^(?!\.)((?!\.{2})[\w!#$&'*+.=\\-]){1,35}(?<!\.)@/,
	NAME_VALID_CHARS_MIN_MAX: new RegExp(
		`^[a-zA-Z0-9_-]{${String(UserValidationRule.NAME_MIN_LENGTH)},${String(UserValidationRule.NAME_MAX_LENGTH)}}$`,
	),
	PASSWORD_CONTAINS_LETTER_AND_NUMBER: /^(?=.*[A-Za-z])(?=.*\d)/,
	PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH: new RegExp(
		`^(?=.*[A-Za-z])(?=.*\\d).{${String(UserValidationRule.PASSWORD_MIN_LENGTH)},${String(UserValidationRule.PASSWORD_MAX_LENGTH)}}$`,
	),
	PASSWORD_VALID_CHARS: /^[\d!#$@A-Za-z]*$/,
} as const;

export { UserValidationRegexRule };
