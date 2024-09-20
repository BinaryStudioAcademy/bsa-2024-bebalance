import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { ChatMessageAuthor, ChatMessageType } from "../../enums/enums.js";
import {
	type AIAssistantResponseDto,
	type ChatMessageDto,
} from "../../types/types.js";
import { type balanceAnalysis } from "./balance-analysis.validation-schema.js";

type BalanceAnalysisData = z.infer<typeof balanceAnalysis>;

const generateScoresResponse = (
	aiResponse: OpenAIResponseMessage,
): AIAssistantResponseDto | null => {
	const message = aiResponse.getPaginatedItems().shift();

	if (!message) {
		return null;
	}

	const parsedResult = AIAssistantMessageValidationSchema.safeParse(message);

	if (!parsedResult.success) {
		return null;
	}

	const contentText: string = parsedResult.data.content[ZERO_INDEX].text.value;
	const resultData: BalanceAnalysisData = JSON.parse(
		contentText,
	) as BalanceAnalysisData;

	let messageIdCounter = ZERO_INDEX;

	const greetingMessage: ChatMessageDto = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: messageIdCounter++,
		isRead: false,
		payload: {
			text: resultData.messages.greeting,
		},
		type: "text",
	};

	const balanceWheelMessage: ChatMessageDto = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: messageIdCounter++,
		isRead: false,
		payload: {
			lowestCategories: resultData.lowestCategories.map((category) => {
				return {
					categoryId: category.categoryId,
					categoryName: category.categoryName,
				};
			}),
			text: resultData.messages.comments,
		},
		type: "balance wheel",
	};

	const categoryQuestion = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: messageIdCounter++,
		isRead: false,
		payload: {
			buttons: [
				{
					label: "Yes, 3 lowest",
					value: "Yes, 3 lowest",
				},
				{
					label: "No, something else",
					value: "No, something else",
				},
			],
			text: resultData.messages.question,
		},
		type: ChatMessageType.QUESTION_WITH_BUTTONS,
	};

	return {
		messages: [greetingMessage, balanceWheelMessage, categoryQuestion],
		threadId: message.thread_id,
	};
};

export { generateScoresResponse };
