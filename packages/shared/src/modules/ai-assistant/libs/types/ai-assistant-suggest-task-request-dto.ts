import { type SelectedCategory } from "../../../categories/categories.js";
import { type ChatMessageCreateDto } from "../../../chats/chats.js";

type AIAssistantSuggestTaskRequestDto = {
	categories: SelectedCategory[];
	message: ChatMessageCreateDto;
};

export { type AIAssistantSuggestTaskRequestDto };
