import { type SelectedCategory } from "../../../categories/categories.js";
import { type SaveTextMessageDto } from "./ai-assistant-save-text-message-dto.type.js";

type AIAssistantSuggestTaskRequestDto = {
	categories: SelectedCategory[];
	messages: SaveTextMessageDto[];
};

export { type AIAssistantSuggestTaskRequestDto };
