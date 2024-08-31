import { UserValidationRule } from "./enums.js";

const UserValidationRegexRule = {
	EMAIL_DOMAIN_PART_LENGTH: new RegExp(
		`@([a-zA-Z0-9.-]{3,${String(UserValidationRule.EMAIL_DOMAIN_PART_MAX_LENGTH)}})$`,
	),
	EMAIL_DOMAIN_PART_VALID_CHARS: /(?<=@)(?!.*[.-]{2})[\w-]*/,
	EMAIL_LOCAL_PART_LENGTH: new RegExp(
		`^[\\w*#$!=&'_+–.]{1,${String(UserValidationRule.EMAIL_LOCAL_PART_MAX_LENGTH)}}(?=@)`,
	),
	EMAIL_LOCAL_PART_VALID_CHARS: /^[\w!#$&'*+.=–]+(?:\.[\w!#$&'*+=–]+)*(?=@)/,
	NAME_VALID_CHARS: /^[\w-]+$/,
	PASSWORD_CONTAINS_LETTER_AND_NUMBER: /^(?=.*[A-Za-z])(?=.*\d)/,
	PASSWORD_VALID_CHARS: /^[\d!#$@A-Za-z]*$/,
} as const;

export { UserValidationRegexRule };
