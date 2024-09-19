import { z } from "zod";

import {
	AIAssistantValidationMessage,
	AiAssistantValidationRule,
} from "../enums/enums.js";

const selectedCategory = z.object({
	categoryId: z
		.number()
		.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.CATEGORY_ID_REQUIRED,
		}),
	categoryName: z
		.string()
		.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.CATEGORY_NAME_REQUIRED,
		}),
});

const taskSuggestionRequest = z.object({
	lastMessageId: z
		.number()
		.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.LAST_MESSAGE_ID_REQUIRED,
		}),
	payload: z
		.array(selectedCategory)
		.nonempty({ message: AIAssistantValidationMessage.CATEGORIES_REQUIRED }),
	threadId: z
		.string()
		.trim()
		.min(AiAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.THREAD_ID_REQUIRED,
		})
		.regex(AiAssistantValidationRule.THREAD_ID_VALID_CHARS, {
			message: AIAssistantValidationMessage.THREAD_ID_INVALID_FORMAT,
		}),
});

export { taskSuggestionRequest };
