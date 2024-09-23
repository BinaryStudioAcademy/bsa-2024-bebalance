import { type SelectedCategory } from "../../../categories/categories.js";

type AIAssistantSuggestTaskRequestDto = {
	categories: SelectedCategory[];
	text: string;
};

export { type AIAssistantSuggestTaskRequestDto };
