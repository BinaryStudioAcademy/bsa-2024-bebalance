import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { changeTasksByCategory } from "./change-task.validation-schema.js";
import { ChangeTasksPromptTemplate } from "./change-task-prompt-template.enum.js";
import { generateChangeTasksPrompt } from "./generate-change-task-prompt.js";

const runChangeTasksByCategoryOptions = (
	tasks: TaskCreateDto[],
): OpenAIRunThreadRequestDto => {
	const changeTasksPrompt = generateChangeTasksPrompt(tasks);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.CHANGE_TASKS,
		instructions: ChangeTasksPromptTemplate.CHANGE_TASKS_INSTRUCTIONS,
		messages: [changeTasksPrompt],
		validationSchema: changeTasksByCategory,
	};
};

export { runChangeTasksByCategoryOptions };
export { generateChangeTasksSuggestionsResponse } from "./generate-change-task-suggestions-response.helper.js";
