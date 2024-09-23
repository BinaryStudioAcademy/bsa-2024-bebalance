import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantAcceptTaskRequestDto = {
	task: TaskCreateDto;
	text: string;
};

export { type AIAssistantAcceptTaskRequestDto };
