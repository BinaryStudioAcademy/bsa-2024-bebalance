import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantChangeTaskRequestDto = {
	task: TaskCreateDto;
	text: string;
};

export { type AIAssistantChangeTaskRequestDto };
