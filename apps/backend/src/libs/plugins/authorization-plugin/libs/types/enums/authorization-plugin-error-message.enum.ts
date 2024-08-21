const AuthorizationPluginErrorMessage = {
	INVALID_TOKEN: "Token verification failed",
	MISSING_HEADER: "Authorization header required for this route",
	USER_NOT_FOUND: "User not found in database",
} as const;

export { AuthorizationPluginErrorMessage };
