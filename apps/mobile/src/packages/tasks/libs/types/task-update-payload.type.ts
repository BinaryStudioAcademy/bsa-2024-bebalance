import { type TaskUpdateRequestDto } from "shared";

type TaskUpdatePayload = {
	id: number;
} & Partial<TaskUpdateRequestDto>;

export { type TaskUpdatePayload };
