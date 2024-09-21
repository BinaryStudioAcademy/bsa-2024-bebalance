import { z } from "zod";

import {
	AIAssistantValidationMessage,
	AIAssistantValidationRule,
} from "../enums/enums.js";

const selectedCategory = z.object({
	id: z.number().min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
		message: AIAssistantValidationMessage.CATEGORY_ID_REQUIRED,
	}),
	name: z.string().min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
		message: AIAssistantValidationMessage.CATEGORY_NAME_REQUIRED,
	}),
});

const taskSuggestionRequest = z.object({
	payload: z
		.array(selectedCategory)
		.nonempty({ message: AIAssistantValidationMessage.CATEGORIES_REQUIRED }),
	threadId: z
		.string()
		.trim()
		.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.THREAD_ID_REQUIRED,
		})
		.regex(AIAssistantValidationRule.THREAD_ID_VALID_CHARS, {
			message: AIAssistantValidationMessage.THREAD_ID_INVALID_FORMAT,
		}),
});

export { taskSuggestionRequest };
