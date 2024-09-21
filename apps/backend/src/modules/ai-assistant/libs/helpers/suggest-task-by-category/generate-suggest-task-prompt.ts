import {
	type OpenAIRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategory } from "../../types/types.js";
import { SuggestTaskPromptTemplate } from "./suggest-task-prompt-template.enum.js";

function generateSuggestTaskPrompt(
	categories: SelectedCategory[],
): OpenAIRequestMessage {
	const content = `
	{
	"context": "${SuggestTaskPromptTemplate.SUGGEST_TASKS_CONTEXT}",
	"categories": ${JSON.stringify(categories)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateSuggestTaskPrompt };
