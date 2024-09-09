import {
	OpenAiPromptTemplates,
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

function generateUserScoresPrompt(
	userScores: QuizScoresGetAllResponseDto,
): OpenAiRequestMessage {
	const { items } = userScores;

	const categories = items.map(({ categoryId, categoryName, score }) => ({
		categoryId,
		categoryName,
		score,
	}));

	const promptContent = {
		categories,
		context: OpenAiPromptTemplates.WHEEL_OF_BALANCE_CONTEXT,
		instructions: OpenAiPromptTemplates.WHEEL_OF_BALANCE_INSTRUCTIONS,
	};

	return {
		content: JSON.stringify(promptContent),
		role: OpenAiRoleKey.USER,
	};
}

export { generateUserScoresPrompt };
