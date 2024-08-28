import { type PatchPayload } from "./patch-payload.type.js";

type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	findAll(): Promise<T[]>;
	findById(id: number): Promise<T>;
	patch(id: number, changes: PatchPayload): Promise<T>;
	update(): Promise<T>;
};

export { type Repository };
