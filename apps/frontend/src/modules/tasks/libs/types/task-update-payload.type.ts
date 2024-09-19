import { type TaskUpdateRequestDto } from "./types.js";

type TaskUpdatePayload = {
	id: number;
	task: Partial<TaskUpdateRequestDto>;
};

export { type TaskUpdatePayload };
