import { type AIAssistantRequestDto } from "../../../ai-assistant/ai-assistant.js";
import { type TaskCreateDto } from "../../../tasks/tasks.js";

type ChangeTasksSuggestionPayload = {
	APIPayload: AIAssistantRequestDto;
	oldSuggestions?: TaskCreateDto[];
};

export { type ChangeTasksSuggestionPayload };
