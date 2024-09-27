import { type AIAssistantChangeTaskRequestDto } from "../../../ai-assistant/ai-assistant.js";
import { type TaskCreateDto } from "../../../tasks/tasks.js";

type ChangeTasksSuggestionPayload = {
	APIPayload: AIAssistantChangeTaskRequestDto;
	oldSuggestions?: TaskCreateDto[];
};

export { type ChangeTasksSuggestionPayload };
