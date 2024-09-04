const AppRoute = {
	ANY: "*",
	CHAT: "/chat",
	FORGOT_PASSWORD: "/forgot-password",
	ONBOARDING: "/onboarding",
	QUIZ: "/quiz",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
