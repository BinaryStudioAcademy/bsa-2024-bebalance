import { type z } from "zod";

import { FIRST_ITEM_INDEX, ZERO_INDEX } from "~/libs/constants/constants.js";
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

	const contentText: string =
		parsedResult.data.content[FIRST_ITEM_INDEX].text.value;
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
		type: ChatMessageType.TEXT,
	};

	const balanceWheelMessage: ChatMessageDto = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: messageIdCounter++,
		isRead: false,
		payload: {
			lowestCategories: resultData.lowestCategories.map((category) => {
				return {
					id: category.id,
					name: category.name,
				};
			}),
			text: resultData.messages.comments,
		},
		type: ChatMessageType.BALANCE_WHEEL,
	};

	return {
		messages: [greetingMessage, balanceWheelMessage],
		threadId: message.thread_id,
	};
};

export { generateScoresResponse };
