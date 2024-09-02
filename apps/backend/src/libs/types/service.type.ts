type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(id: number): Promise<T>;
	findAll(): Promise<{
		items: T[];
	}>;
	update(id: number, properties: Partial<T>): Promise<T>;
};

export { type Service };
