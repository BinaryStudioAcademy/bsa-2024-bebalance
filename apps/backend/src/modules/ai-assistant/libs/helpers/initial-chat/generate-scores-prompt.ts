import {
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

import { OpenAiInitialPromptTemplates } from "./generate-init-promt-message.enum.js";

function generateUserScoresPrompt(
	userScores: QuizScoresGetAllResponseDto,
): OpenAiRequestMessage {
	const { items } = userScores;

	const categories = items.map(({ categoryId, categoryName }) => ({
		categoryId,
		categoryName,
	}));

	/* eslint-disable perfectionist/sort-objects */
	const promptContent = {
		context: OpenAiInitialPromptTemplates.WHEEL_OF_BALANCE_CONTEXT,
		categories,
	};

	return {
		content: JSON.stringify(promptContent),
		role: OpenAiRoleKey.USER,
	};
}

export { generateUserScoresPrompt };
