import { z } from "zod";

import { type ValueOf } from "../../../../libs/types/types.js";
import { ChatMessageAuthor } from "../../../chats/chats.js";
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
	messages: z.array(
		z.object({
			author: z.enum(
				Object.values(ChatMessageAuthor) as [ValueOf<typeof ChatMessageAuthor>],
				{
					errorMap: () => ({
						message: AIAssistantValidationMessage.INVALID_MESSAGE_AUTHOR,
					}),
				},
			),
			text: z
				.string()
				.trim()
				.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
					message: AIAssistantValidationMessage.TEXT_REQUIRED,
				}),
		}),
	),
});

export { taskSuggestionRequest };
