import { type SelectedCategory } from "../../../categories/categories.js";
import { type ChatMessageCreateDto } from "../../../chats/chats.js";
import { type TaskCreateDto } from "../../../tasks/tasks.js";

type AIAssistantRequestDto = {
	message: ChatMessageCreateDto;
	payload: SelectedCategory[] | TaskCreateDto;
};

export { type AIAssistantRequestDto };
