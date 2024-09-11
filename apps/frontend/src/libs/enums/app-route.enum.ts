const AppRoute = {
	ANY: "*",
	CHAT: "/chat",
	FORGOT_PASSWORD: "/forgot-password",
	ONBOARDING: "/onboarding",
	PROFILE: "/profile",
	QUIZ: "/quiz",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SETTINGS: "/settings",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
