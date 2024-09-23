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
	categories: z
		.array(selectedCategory)
		.nonempty({ message: AIAssistantValidationMessage.CATEGORIES_REQUIRED }),
	text: z
		.string()
		.trim()
		.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.TEXT_REQUIRED,
		}),
});

export { taskSuggestionRequest };
