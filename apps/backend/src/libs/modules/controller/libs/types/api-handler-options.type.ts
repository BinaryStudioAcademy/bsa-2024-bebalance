type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
	uploadedFile?: unknown;
	user?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
	uploadedFile?: T["uploadedFile"];
	user: T["user"];
};

export { type APIHandlerOptions };
