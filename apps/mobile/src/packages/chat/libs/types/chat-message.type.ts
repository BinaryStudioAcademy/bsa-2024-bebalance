import {
	type ChatMessageDto,
	type TaskMessage,
	type TextMessage,
} from "~/packages/chat/chat";

type ChatMessage = Omit<
	ChatMessageDto<TaskMessage[] | TextMessage>,
	"createdAt" | "id" | "threadId" | "updatedAt"
>;

export { type ChatMessage };
