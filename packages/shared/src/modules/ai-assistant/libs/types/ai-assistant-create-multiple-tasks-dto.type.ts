import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantCreateMultipleTasksDto = {
	payload: TaskCreateDto[];
	text: string;
};

export { type AIAssistantCreateMultipleTasksDto };
