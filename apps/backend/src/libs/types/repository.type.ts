type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(payload: unknown): Promise<T>;
	findAll(): Promise<T[]>;
	update(): Promise<T>;
};

export { type Repository };
