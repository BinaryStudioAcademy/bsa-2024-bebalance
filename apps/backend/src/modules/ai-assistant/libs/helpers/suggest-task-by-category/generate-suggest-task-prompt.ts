import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategories } from "../../types/types.js";
import { SuggestTaskPromptTemplates } from "./suggest-task-prompt-template.enum.js";

function generateSuggestTaskPrompt(
	categories: SelectedCategories[],
	context: string = SuggestTaskPromptTemplates.SUGGEST_TASKS_CONTEXT,
): OpenAiRequestMessage {
	/* eslint-disable perfectionist/sort-objects */
	return {
		content: JSON.stringify({ context, categories }),
		role: OpenAIRoleKey.USER,
	};
}

export { generateSuggestTaskPrompt };
