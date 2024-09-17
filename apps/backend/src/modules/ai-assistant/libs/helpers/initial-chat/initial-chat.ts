import {
	OpenAIFunctionName,
	type OpenAiRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

import { balanceAnalysis as BalanceAnalysisResponseValidationSchema } from "./balance-analysis.validation-schema.js";
import { OpenAiInitialPromptTemplates } from "./generate-init-prompt-message.enum.js";
import { generateUserScoresPrompt } from "./generate-scores-prompt.js";

const runInitialThreadOptions = (
	userName: string,
	userWheelBalanceScores: QuizScoresGetAllResponseDto,
): OpenAiRunThreadRequestDto => {
	const userScoresPrompt = generateUserScoresPrompt(userWheelBalanceScores);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.ANALYZE_BALANCE_SCORES,
		instructions:
			OpenAiInitialPromptTemplates.WHEEL_OF_BALANCE_INSTRUCTIONS.replace(
				"{{userName}}",
				userName,
			),
		messages: [userScoresPrompt],
		validationSchema: BalanceAnalysisResponseValidationSchema,
	};
};

export { runInitialThreadOptions };
export { generateQuestionsAnswersPrompt } from "./generate-questions-answers-prompt.js";
export { generateScoresResponse } from "./generate-scores-response.js";
