import { z } from "zod";

import {
	AIAssistantValidationMessage,
	AIAssistantValidationRule,
} from "../enums/enums.js";

type AiAssistantMessageCreateDto = {
	text: z.ZodString;
	threadId: z.ZodString;
};

const addMessageToThread = z
	.object<AiAssistantMessageCreateDto>({
		text: z
			.string()
			.trim()
			.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
				message: AIAssistantValidationMessage.TEXT_REQUIRED,
			}),
		threadId: z
			.string()
			.trim()
			.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
				message: AIAssistantValidationMessage.THREAD_ID_REQUIRED,
			})
			.regex(AIAssistantValidationRule.THREAD_ID_VALID_CHARS, {
				message: AIAssistantValidationMessage.THREAD_ID_INVALID_FORMAT,
			}),
	})
	.required();

export { addMessageToThread };
