import {
	OpenAIFunctionName,
	type OpenAiRunThreadRequestDto,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { explainTask as explainTaskValidationSchema } from "./explain-task.validation-schema.js";
import { ExplainTaskPromptTemplates } from "./explain-task-prompt-template.js";
import { generateExplainTaskPrompt } from "./generate-explain-task-prompt.js";

const runExplainTaskOptions = (
	task: TaskCreateDto,
): OpenAiRunThreadRequestDto => {
	const explainTaskPrompt = generateExplainTaskPrompt(task);

	return {
		additional_instructions: null,
		function_name: OpenAIFunctionName.CHANGE_TASK,
		instructions: ExplainTaskPromptTemplates.EXPLAIN_TASK_INSTRUCTIONS,
		messages: [explainTaskPrompt],
		validationSchema: explainTaskValidationSchema,
	};
};

export { runExplainTaskOptions };
export { generateExplainTaskSuggestionsResponse } from "./explain-task-response.js";
