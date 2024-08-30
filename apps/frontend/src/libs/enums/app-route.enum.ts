const AppRoute = {
	ANY: "*",
	PROFILE: "/profile/:id",
	QUIZ: "/quiz",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
