import { z } from "zod";

import {
	AIAssistantValidationMessage,
	AIAssistantValidationRule,
} from "../enums/enums.js";

const taskActionRequestSchema = z.object({
	task: z.object({
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
		dueDate: z.string().datetime({
			message: AIAssistantValidationMessage.DUE_DATE_INVALID_FORMAT,
		}),
		label: z.string().min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.LABEL_REQUIRED,
		}),
	}),
	text: z
		.string()
		.trim()
		.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
			message: AIAssistantValidationMessage.TEXT_REQUIRED,
		}),
});

export { taskActionRequestSchema };
