import {
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategories } from "../../types/types.js";
import { SuggestTaskPromptTemplates } from "./suggest-task-prompt-messages.enum.js";

function generateSuggestTaskPrompt(
	categories: SelectedCategories[],
): OpenAiRequestMessage {
	/* eslint-disable perfectionist/sort-objects */
	const promptContent = {
		context: SuggestTaskPromptTemplates.SUGGEST_TASKS_CONTEXT,
		categories,
	};

	return {
		content: JSON.stringify(promptContent),
		role: OpenAiRoleKey.USER,
	};
}

export { generateSuggestTaskPrompt };
