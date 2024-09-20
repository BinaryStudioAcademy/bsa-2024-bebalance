import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";
import { type QuizScoresGetAllResponseDto } from "~/modules/categories/categories.js";

import { balanceAnalysis } from "./balance-analysis.validation-schema.js";
import { OpenAIInitialPromptTemplate } from "./generate-init-prompt-template.enum.js";
import { generateUserScoresPrompt } from "./generate-scores-prompt.js";

const runInitialThreadOptions = (
	userName: string,
	userWheelBalanceScores: QuizScoresGetAllResponseDto,
): OpenAIRunThreadRequestDto => {
	const userScoresPrompt = generateUserScoresPrompt(userWheelBalanceScores);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.ANALYZE_BALANCE_SCORES,
		instructions:
			OpenAIInitialPromptTemplate.WHEEL_OF_BALANCE_INSTRUCTIONS.replace(
				"{{userName}}",
				userName,
			),
		messages: [userScoresPrompt],
		validationSchema: balanceAnalysis,
	};
};

export { runInitialThreadOptions };
export { generateQuestionsAnswersPrompt } from "./generate-questions-answers-prompt.js";
export { generateScoresResponse } from "./generate-scores-response.js";
