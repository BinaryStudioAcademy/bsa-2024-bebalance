import { type TaskUpdateRequestDto } from "shared";

type TaskUpdatePayload = {
	id: number;
} & TaskUpdateRequestDto;

export { type TaskUpdatePayload };
