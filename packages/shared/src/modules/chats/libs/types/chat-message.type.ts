import { type ChatMessageDto } from "./chat-message-dto.type.js";
import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

type ChatMessage = Omit<
	ChatMessageDto<TaskMessage[] | TextMessage>,
	"createdAt" | "id"
>;

export { type ChatMessage };
