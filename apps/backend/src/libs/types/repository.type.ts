import { type UpdatePayload } from "./update-payload.type.js";

type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	findAll(): Promise<T[]>;
	findById(id: number): Promise<T>;
	patch(id: number, changes: UpdatePayload): Promise<T>;
	update(): Promise<T>;
};

export { type Repository };
