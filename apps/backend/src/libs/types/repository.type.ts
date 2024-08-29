type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
	patch(id: number, changes: Partial<T>): Promise<T>;
	update(): Promise<T>;
};

export { type Repository };
