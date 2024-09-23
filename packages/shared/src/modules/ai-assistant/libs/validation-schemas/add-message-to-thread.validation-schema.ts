import { z } from "zod";

import {
	AIAssistantValidationMessage,
	AIAssistantValidationRule,
} from "../enums/enums.js";

type AiAssistantMessageCreateDto = {
	text: z.ZodString;
};

const addMessageToThread = z
	.object<AiAssistantMessageCreateDto>({
		text: z
			.string()
			.trim()
			.min(AIAssistantValidationRule.NON_EMPTY_ITEM_MIN_LENGTH, {
				message: AIAssistantValidationMessage.TEXT_REQUIRED,
			}),
	})
	.required();

export { addMessageToThread };
