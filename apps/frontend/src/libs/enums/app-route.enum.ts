const AppRoute = {
	ANY: "*",
	FORGOT_PASSWORD: "/forgot-password",
	PROFILE: "/profile",
	QUIZ: "/quiz",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
