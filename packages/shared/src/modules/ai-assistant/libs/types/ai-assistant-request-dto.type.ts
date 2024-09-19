import { type SelectedCategory } from "../../../categories/categories.js";
import { type TextMessage } from "../../../chats/chats.js";
import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantRequestDto = {
	lastMessageId: number;
	payload: SelectedCategory[] | TaskCreateDto | TextMessage;
	threadId: string;
};

export { type AIAssistantRequestDto };
