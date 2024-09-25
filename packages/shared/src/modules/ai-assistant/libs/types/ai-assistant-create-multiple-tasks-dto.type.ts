import { type TaskCreateDto } from "../../../tasks/tasks.js";
import { type SaveTextMessageDto } from "./ai-assistant-save-text-message-dto.type.js";

type AIAssistantCreateMultipleTasksDto = {
	messages: SaveTextMessageDto[];
	tasks: TaskCreateDto[];
};

export { type AIAssistantCreateMultipleTasksDto };
