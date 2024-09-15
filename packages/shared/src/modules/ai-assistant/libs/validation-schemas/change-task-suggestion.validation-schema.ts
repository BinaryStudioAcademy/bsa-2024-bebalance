import { z } from "zod";

import {
	AiAssistantValidationMessage,
	AiAssistantValidationRule,
} from "../enums/enums.js";

const ChangeTaskSuggestionRequest = z.object({
	task: z.object({
		categoryId: z.number({
			invalid_type_error: AiAssistantValidationMessage.CATEGORY_ID_REQUIRED,
		}),
		categoryName: z
			.string()
			.min(AiAssistantValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: AiAssistantValidationMessage.CATEGORY_NAME_REQUIRED,
			}),
		description: z
			.string()
			.min(AiAssistantValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: AiAssistantValidationMessage.DESCRIPTION_REQUIRED,
			}),
		dueDate: z.string().regex(AiAssistantValidationRule.DATE_FORMAT, {
			message: AiAssistantValidationMessage.DUE_DATE_INVALID_FORMAT,
		}),
		label: z
			.string()
			.min(AiAssistantValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: AiAssistantValidationMessage.LABEL_REQUIRED,
			}),
	}),
	threadId: z
		.string()
		.trim()
		.min(AiAssistantValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: AiAssistantValidationMessage.THREAD_ID_REQUIRED,
		})
		.regex(AiAssistantValidationRule.THREAD_ID_VALID_CHARS, {
			message: AiAssistantValidationMessage.THREAD_ID_INVALID_FORMAT,
		}),
});

export { ChangeTaskSuggestionRequest };