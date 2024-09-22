import { type TaskCreateDto, type TaskDto } from "../../../tasks/tasks.js";

type TaskMessage = {
	task: TaskCreateDto & TaskDto;
	text?: string;
};

export { type TaskMessage };
