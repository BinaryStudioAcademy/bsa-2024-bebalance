import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type SelectedCategory } from "../../types/types.js";
import { generateSuggestTaskPrompt } from "./generate-suggest-task-prompt.js";
import { taskByCategory } from "./suggest-task-by-category.validation-schema.js";
import { SuggestTaskPromptTemplate } from "./suggest-task-prompt-template.enum.js";

const runSuggestTaskByCategoryOptions = (
	categories: SelectedCategory[],
): OpenAIRunThreadRequestDto => {
	const suggestTaskPrompt = generateSuggestTaskPrompt(categories);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.GENERATE_TASK_BY_CATEGORY,
		instructions: SuggestTaskPromptTemplate.SUGGEST_TASKS_INSTRUCTIONS,
		messages: [suggestTaskPrompt],
		validationSchema: taskByCategory,
	};
};

export { runSuggestTaskByCategoryOptions };
export { generateTasksSuggestionsResponse } from "./generate-suggest-task-response.helper.js";
