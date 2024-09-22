import { type ChatMessageDto, type TextMessage } from "../../../chats/chats.js";
import { type TaskPayload } from "../../../tasks/tasks.js";

type AIAssistantResponseDto = {
	messages: ChatMessageDto<TaskPayload & TextMessage>[];
	threadId: string;
};

export { type AIAssistantResponseDto };
