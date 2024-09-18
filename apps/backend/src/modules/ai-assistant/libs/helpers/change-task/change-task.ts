import {
	OpenAIFunctionName,
	type OpenAiRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { changeTaskByCategory as ChangeTaskByCategoryValidationSchema } from "./change-task.validation-schema.js";
import { ChangeTaskPromptTemplates } from "./change-task-prompt-template.enum.js";
import { generateChangeTaskPrompt } from "./generate-change-task-prompt.js";

const runChangeTaskByCategoryOptions = (
	task: TaskCreateDto,
): OpenAiRunThreadRequestDto => {
	const changeTaskPrompt = generateChangeTaskPrompt(task);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.CHANGE_TASK,
		instructions: ChangeTaskPromptTemplates.CHANGE_TASKS_INSTRUCTIONS,
		messages: [changeTaskPrompt],
		validationSchema: ChangeTaskByCategoryValidationSchema,
	};
};

export { runChangeTaskByCategoryOptions };
export { generateChangeTaskSuggestionsResponse } from "./change-task-response.js";
