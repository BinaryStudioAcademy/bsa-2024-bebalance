import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantExplainTaskRequestDto = {
	task: TaskCreateDto;
	text: string;
};

export { type AIAssistantExplainTaskRequestDto };
