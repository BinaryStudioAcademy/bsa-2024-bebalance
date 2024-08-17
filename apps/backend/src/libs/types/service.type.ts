type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(query: Partial<Record<string, unknown>>): Promise<T>;
	findAll(): Promise<{
		items: T[];
	}>;
	update(): Promise<T>;
};

export { type Service };
