import { type TaskCreateDto } from "../../../tasks/tasks.js";
import { type ChatMessage } from "./chat-message.type.js";

type ProcessedMessagesAndSuggestions = {
	messages: ChatMessage[];
	taskSuggestions: TaskCreateDto[];
};

export { type ProcessedMessagesAndSuggestions };
