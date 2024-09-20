import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { changeTaskByCategory } from "./change-task.validation-schema.js";
import { ChangeTaskPromptTemplate } from "./change-task-prompt-template.enum.js";
import { generateChangeTaskPrompt } from "./generate-change-task-prompt.js";

const runChangeTaskByCategoryOptions = (
	task: TaskCreateDto,
): OpenAIRunThreadRequestDto => {
	const changeTaskPrompt = generateChangeTaskPrompt(task);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.CHANGE_TASK,
		instructions: ChangeTaskPromptTemplate.CHANGE_TASKS_INSTRUCTIONS,
		messages: [changeTaskPrompt],
		validationSchema: changeTaskByCategory,
	};
};

export { runChangeTaskByCategoryOptions };
export { generateChangeTaskSuggestionsResponse } from "./change-task-response.js";
