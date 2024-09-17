import { z } from "zod";

import {
	AiAssistantValidationMessage,
	AiAssistantValidationRule,
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
			.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
				message: AiAssistantValidationMessage.TEXT_REQUIRED,
			}),
		threadId: z
			.string()
			.trim()
			.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
				message: AiAssistantValidationMessage.THREAD_ID_REQUIRED,
			})
			.regex(AiAssistantValidationRule.THREAD_ID_VALID_CHARS, {
				message: AiAssistantValidationMessage.THREAD_ID_INVALID_FORMAT,
			}),
	})
	.required();

export { addMessageToThread };
