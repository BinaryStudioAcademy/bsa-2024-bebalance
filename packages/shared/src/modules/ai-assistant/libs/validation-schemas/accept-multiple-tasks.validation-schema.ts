import { z } from "zod";

import { type ValueOf } from "../../../../libs/types/types.js";
import { ChatMessageAuthor } from "../../../chats/chats.js";
import {
	AIAssistantValidationMessage,
	AIAssistantValidationRule,
} from "../enums/enums.js";

const acceptMultipleTasks = z.object({
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
	tasks: z.array(
		z.object({
			categoryId: z.number({
				invalid_type_error: AIAssistantValidationMessage.CATEGORY_ID_REQUIRED,
			}),
			categoryName: z
				.string()
				.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
					message: AIAssistantValidationMessage.CATEGORY_NAME_REQUIRED,
				}),
			description: z
				.string()
				.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
					message: AIAssistantValidationMessage.DESCRIPTION_REQUIRED,
				}),
			label: z
				.string()
				.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
					message: AIAssistantValidationMessage.LABEL_REQUIRED,
				}),
		}),
	),
});

export { acceptMultipleTasks };
