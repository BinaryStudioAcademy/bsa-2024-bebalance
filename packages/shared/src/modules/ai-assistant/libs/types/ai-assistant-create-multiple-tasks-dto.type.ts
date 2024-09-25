import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantCreateMultipleTasksDto = {
	payload: TaskCreateDto[];
	threadId: string;
};

export { type AIAssistantCreateMultipleTasksDto };
