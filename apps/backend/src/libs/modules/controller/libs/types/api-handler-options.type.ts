type DefaultApiHandlerOptions = {
	body?: unknown;
	headers?: unknown;
	params?: unknown;
	query?: unknown;
	userPayload?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	headers: T["headers"];
	params: T["params"];
	query: T["query"];
	userPayload?: T["userPayload"];
};

export { type APIHandlerOptions };
