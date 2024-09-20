import {
	OpenAIFunctionName,
	type OpenAIRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { explainTask } from "./explain-task.validation-schema.js";
import { ExplainTaskPromptTemplate } from "./explain-task-prompt-template.js";
import { generateExplainTaskPrompt } from "./generate-explain-task-prompt.js";

const runExplainTaskOptions = (
	task: TaskCreateDto,
): OpenAIRunThreadRequestDto => {
	const explainTaskPrompt = generateExplainTaskPrompt(task);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.EXPLAIN_TASK,
		instructions: ExplainTaskPromptTemplate.EXPLAIN_TASK_INSTRUCTIONS,
		messages: [explainTaskPrompt],
		validationSchema: explainTask,
	};
};

export { runExplainTaskOptions };
export { generateExplainTaskSuggestionsResponse } from "./explain-task-response.js";
