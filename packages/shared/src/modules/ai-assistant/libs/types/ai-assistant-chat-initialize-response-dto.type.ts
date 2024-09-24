import { type ChatMessageDto } from "../../../chats/chats.js";

type AIAssistantChatInitializeResponseDto = {
	messages: ChatMessageDto[];
	threadId: string;
};

export { type AIAssistantChatInitializeResponseDto };
