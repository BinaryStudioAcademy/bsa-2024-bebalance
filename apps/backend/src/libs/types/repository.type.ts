type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(payload: unknown): Promise<T>;
	findAll(): Promise<T[]>;
	update(id: number, payload: unknown): Promise<T>;
};

export { type Repository };
