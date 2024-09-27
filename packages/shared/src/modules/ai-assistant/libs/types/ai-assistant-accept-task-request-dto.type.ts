import { type TaskCreateDto } from "../../../tasks/tasks.js";
import { type SaveTextMessageDto } from "./ai-assistant-save-text-message-dto.type.js";

type AIAssistantAcceptTaskRequestDto = {
	messages: SaveTextMessageDto[];
	task: TaskCreateDto;
};

export { type AIAssistantAcceptTaskRequestDto };
