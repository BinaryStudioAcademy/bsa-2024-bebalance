import {
	type OpenAIRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

import { OpenAIInitialPromptTemplate } from "./generate-init-prompt-template.enum.js";

function generateUserScoresPrompt(
	userScores: QuizScoresGetAllResponseDto,
): OpenAIRequestMessage {
	const { items } = userScores;

	const categories = items.map(({ categoryId, categoryName, score }) => ({
		categoryId,
		categoryName,
		score,
	}));

	const content = `
	{
	"context": "${OpenAIInitialPromptTemplate.WHEEL_OF_BALANCE_CONTEXT}"
	"categories": ${JSON.stringify(categories)},
	"instructions": "${OpenAIInitialPromptTemplate.WHEEL_OF_BALANCE_INSTRUCTIONS}",
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateUserScoresPrompt };
