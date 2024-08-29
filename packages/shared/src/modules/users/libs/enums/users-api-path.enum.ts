const UsersApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	GET: "/get/:id",
	ROOT: "/",
	UPDATE: "/update/:id",
} as const;

export { UsersApiPath };
