import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

import { OpenAiInitialPromptTemplates } from "./generate-init-prompt-template.enum.js";

function generateUserScoresPrompt(
	userScores: QuizScoresGetAllResponseDto,
): OpenAiRequestMessage {
	const { items } = userScores;

	const categories = items.map(({ categoryId, categoryName, score }) => ({
		categoryId,
		categoryName,
		score,
	}));

	const content = `
	{
	"context": "${OpenAiInitialPromptTemplates.WHEEL_OF_BALANCE_CONTEXT}"
	"categories": ${JSON.stringify(categories)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateUserScoresPrompt };
