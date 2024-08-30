type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
	update(id: number, changes: Partial<T>): Promise<T>;
};

export { type Repository };
