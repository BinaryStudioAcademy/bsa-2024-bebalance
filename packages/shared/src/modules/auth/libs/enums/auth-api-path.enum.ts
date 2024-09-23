const AuthApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	CHECK_RESET_PASSWORD_EXPIRATION: "/check-reset-password-expiration",
	FORGOT_PASSWORD: "/forgot-password",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UPDATE_PASSWORD: "/update-password",
} as const;

export { AuthApiPath };
