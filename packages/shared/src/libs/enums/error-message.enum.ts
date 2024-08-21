const ErrorMessage = {
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INVALID_TOKEN: "Invalid token.",
	MISSING_AUTHORIZATION_HEADER: "Authorization header required for this route.",
	USER_NOT_FOUND: "User not found in database.",
} as const;

export { ErrorMessage };
