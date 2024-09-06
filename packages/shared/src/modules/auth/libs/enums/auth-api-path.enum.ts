const AuthApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	CHECK_RESET_PASSWORD_EXP: "/check-reset-password-exp",
	FORGOT_PASSWORD: "/forgot-password",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AuthApiPath };
