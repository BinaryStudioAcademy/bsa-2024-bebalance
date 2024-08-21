type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(): Promise<T>;
	update(): Promise<T>;
};

export { type Repository };
