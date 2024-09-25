import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { explainTasks } from "./explain-tasks.validation-schema.js";
import { ExplainTasksPromptTemplate } from "./explain-tasks-prompt-template.js";
import { generateExplainTasksPrompt } from "./generate-explain-tasks-prompt.js";

const runExplainTaskOptions = (
	tasks: TaskCreateDto[],
): OpenAIRunThreadRequestDto => {
	const explainTasksPrompt = generateExplainTasksPrompt(tasks);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.EXPLAIN_TASKS,
		instructions: ExplainTasksPromptTemplate.EXPLAIN_TASKS_INSTRUCTIONS,
		messages: [explainTasksPrompt],
		validationSchema: explainTasks,
	};
};

export { runExplainTaskOptions };
export { generateExplainTasksSuggestionsResponse } from "./generate-explain-tasks-suggestion-response.helper.js";
