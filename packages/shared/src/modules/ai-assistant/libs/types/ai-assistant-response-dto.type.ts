import { type ChatMessageDto } from "../../../chats/chats.js";

type AIAssistantResponseDto = {
	messages: ChatMessageDto[];
	threadId: string;
};

export { type AIAssistantResponseDto };
