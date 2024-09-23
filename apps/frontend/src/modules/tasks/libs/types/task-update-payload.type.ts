import { type TaskUpdateRequestDto } from "./types.js";

type TaskUpdatePayload = {
	id: number;
} & Partial<TaskUpdateRequestDto>;

export { type TaskUpdatePayload };
