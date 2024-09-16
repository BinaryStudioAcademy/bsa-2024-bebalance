import {
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategories } from "../../types/types.js";
import { SuggestTaskPromptTemplates } from "./suggest-task-prompt-messages.enum.js";

function generateSuggestTaskPrompt(
	categories: SelectedCategories[],
	context: string = SuggestTaskPromptTemplates.SUGGEST_TASKS_CONTEXT,
): OpenAiRequestMessage {
	/* eslint-disable perfectionist/sort-objects */
	return {
		content: JSON.stringify({ context, categories }),
		role: OpenAiRoleKey.USER,
	};
}

export { generateSuggestTaskPrompt };
