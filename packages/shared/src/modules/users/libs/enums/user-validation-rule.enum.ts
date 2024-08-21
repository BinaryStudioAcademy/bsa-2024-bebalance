const UserValidationRule = {
	EMAIL_MINIMUM_LENGTH: 6,
	NAME_MINIMUM_LENGTH: 1,
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	PASSWORD_MAX_LENGTH: 30,
	PASSWORD_MIN_LENGTH: 3,
} as const;

export { UserValidationRule };
