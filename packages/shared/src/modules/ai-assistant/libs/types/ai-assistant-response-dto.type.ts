import { type ChatMessageDto, type TextMessage } from "../../../chats/chats.js";
import { type TaskCreateDto, type TaskDto } from "../../../tasks/tasks.js";

type AIAssistantResponseDto = {
	messages: ChatMessageDto<TaskCreateDto & TaskDto & TextMessage>[];
	threadId: string;
};

export { type AIAssistantResponseDto };
