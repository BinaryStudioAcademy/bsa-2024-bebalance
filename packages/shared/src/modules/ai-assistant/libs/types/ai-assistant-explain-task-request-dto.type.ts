import { type TaskCreateDto } from "../../../tasks/tasks.js";
import { type SaveTextMessageDto } from "./ai-assistant-save-text-message-dto.type.js";

type AIAssistantExplainTaskRequestDto = {
	messages: SaveTextMessageDto[];
	task: TaskCreateDto;
};

export { type AIAssistantExplainTaskRequestDto };
