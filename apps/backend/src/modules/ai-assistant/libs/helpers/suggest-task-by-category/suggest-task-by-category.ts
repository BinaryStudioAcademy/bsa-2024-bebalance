import {
	OpenAIFunctionName,
	type OpenAiRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategory } from "../../types/types.js";
import { generateSuggestTaskPrompt } from "./generate-suggest-task-prompt.js";
import { taskByCategory as TaskByCategoryValidationSchema } from "./suggest-task-by-category.validation-schema.js";
import { SuggestTaskPromptTemplates } from "./suggest-task-prompt-template.enum.js";

const runTaskByCategoryOptions = (
	categories: SelectedCategory[],
): OpenAiRunThreadRequestDto => {
	const suggestTaskPrompt = generateSuggestTaskPrompt(categories);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.GENERATE_TASK_BY_CATEGORY,
		instructions: SuggestTaskPromptTemplates.SUGGEST_TASKS_INSTRUCTIONS,
		messages: [suggestTaskPrompt],
		validationSchema: TaskByCategoryValidationSchema,
	};
};

export { runTaskByCategoryOptions };
export { generateTaskSuggestionsResponse } from "./generate-suggest-task-response.js";
