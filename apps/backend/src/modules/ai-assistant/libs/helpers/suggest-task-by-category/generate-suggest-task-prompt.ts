import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategories } from "../../types/types.js";
import { SuggestTaskPromptTemplates } from "./suggest-task-prompt-template.enum.js";

function generateSuggestTaskPrompt(
	categories: SelectedCategories[],
): OpenAiRequestMessage {
	const content = `
	{
	"context": "${SuggestTaskPromptTemplates.SUGGEST_TASKS_CONTEXT}",
	"categories": ${JSON.stringify(categories)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateSuggestTaskPrompt };
