const UserValidationRule = {
	EMAIL_MINIMUM_LENGTH: 6,
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	PASSWORD_MINIMUM_LENGTH: 8,
} as const;

export { UserValidationRule };
