const UsersApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	GET: "/:id",
	PATCH: "/:id",
	ROOT: "/",
} as const;

export { UsersApiPath };
