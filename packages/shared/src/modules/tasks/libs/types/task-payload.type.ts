import { type TaskCreateDto } from "./task-create-dto.type.js";
import { type TaskDto } from "./task-dto.type.js";

type TaskPayload = {
	task: TaskCreateDto & TaskDto;
};

export { type TaskPayload };
