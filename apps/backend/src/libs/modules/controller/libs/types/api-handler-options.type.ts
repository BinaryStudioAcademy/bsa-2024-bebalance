type DefaultApiHandlerOptions = {
	body?: unknown;
	file?: unknown;
	params?: unknown;
	query?: unknown;
	user?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	file?: T["file"];
	params: T["params"];
	query: T["query"];
	user: T["user"];
};

export { type APIHandlerOptions };
