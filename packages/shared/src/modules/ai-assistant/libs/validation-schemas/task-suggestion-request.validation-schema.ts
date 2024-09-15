import { z } from "zod";

import {
	AiAssistantValidationMessage,
	AiAssistantValidationRule,
} from "../enums/enums.js";

const TaskSuggestionRequest = z.object({
	categories: z
		.array(
			z.object({
				categoryId: z
					.number()
					.min(AiAssistantValidationRule.NON_EMPTY_NUMBER_MIN_LENGTH, {
						message: AiAssistantValidationMessage.CATEGORY_ID_REQUIRED,
					}),
				categoryName: z
					.string()
					.min(AiAssistantValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
						message: AiAssistantValidationMessage.CATEGORY_NAME_REQUIRED,
					}),
			}),
		)
		.nonempty({
			message: AiAssistantValidationMessage.CATEGORIES_REQUIRED,
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

export { TaskSuggestionRequest };
