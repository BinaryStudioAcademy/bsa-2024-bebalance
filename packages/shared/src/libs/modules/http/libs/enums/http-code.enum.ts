const HTTPCode = {
	CREATED: 201,
	INTERNAL_SERVER_ERROR: 500,
	OK: 200,
	UNATHORIZED: 401,
	UNPROCESSED_ENTITY: 422,
} as const;

export { HTTPCode };
