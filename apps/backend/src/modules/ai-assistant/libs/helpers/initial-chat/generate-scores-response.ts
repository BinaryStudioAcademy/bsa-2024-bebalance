import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AiAssistantMessageValidationSchema,
	type OpenAiResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { type BalanceWheelAnalysisResponseDto } from "../../types/types.js";
import { type BalanceAnalysis } from "./balance-analysis.validation-schema.js";

type BalanceAnalysisData = z.infer<typeof BalanceAnalysis>;

const generateScoresResponse = (
	aiResponse: OpenAiResponseMessage,
): BalanceWheelAnalysisResponseDto | null => {
	const message = aiResponse.getPaginatedItems().shift();

	if (!message) {
		return null;
	}

	const parsedResult = AiAssistantMessageValidationSchema.safeParse(message);

	if (parsedResult.success) {
		const contentText: string =
			parsedResult.data.content[ZERO_INDEX].text.value;
		const resultData: BalanceAnalysisData = JSON.parse(
			contentText,
		) as BalanceAnalysisData;

		return {
			lowestCategories: resultData.lowestCategories.map((category) => ({
				categoryId: Number(category.categoryId),
				categoryName: category.categoryName,
				score: category.score,
			})),
			messages: {
				comments: resultData.messages.comments,
				greeting: resultData.messages.greeting,
				question: resultData.messages.question,
			},
			threadId: message.thread_id,
		};
	}

	return null;
};

export { generateScoresResponse };
