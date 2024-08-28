type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	findAll(): Promise<{
		items: T[];
	}>;
	findById(id: number): Promise<T>;
	update(): Promise<T>;
};

export { type Service };
