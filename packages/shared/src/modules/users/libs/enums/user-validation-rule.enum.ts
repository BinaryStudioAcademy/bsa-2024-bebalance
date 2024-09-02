const UserValidationRule = {
	EMAIL_DOMAIN_PART_MAX_LENGTH: 35,
	EMAIL_LOCAL_PART_MAX_LENGTH: 35,
	EMAIL_MAX_LENGTH: 71,
	EMAIL_MINIMUM_LENGTH: 5,
	NAME_MAX_LENGTH: 40,
	NAME_MIN_LENGTH: 3,
	NO_ERROR: 0,
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	PASSWORD_MAX_LENGTH: 16,
	PASSWORD_MIN_LENGTH: 6,
} as const;

export { UserValidationRule };
