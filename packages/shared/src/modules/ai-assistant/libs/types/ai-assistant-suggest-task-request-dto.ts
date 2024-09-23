import { type SelectedCategory } from "../../../categories/categories.js";

type AIAssistantSuggestTaskRequestDto = {
	categories: SelectedCategory[];
	threadId: string;
};

export { type AIAssistantSuggestTaskRequestDto };
