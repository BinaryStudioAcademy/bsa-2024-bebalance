import { type UpdatePayload } from "./update-payload.type.js";

type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	findAll(): Promise<T[]>;
	findById(id: number): Promise<T>;
	update(id: number, changes: UpdatePayload): Promise<T>;
};

export { type Repository };
