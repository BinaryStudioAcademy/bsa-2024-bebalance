const AppRoute = {
	ANY: "*",
	FORGOT_PASSWORD: "/forgot-password",
	QUIZ: "/quiz",
	RESET_PASSWORD: "/reset-password/:token",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
