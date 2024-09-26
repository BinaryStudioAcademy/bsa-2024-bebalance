import {
	type OpenAIRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ExplainTasksPromptTemplate } from "./explain-tasks-prompt-template.js";

function generateExplainTasksPrompt(
	tasks: TaskCreateDto[],
): OpenAIRequestMessage {
	const content = `
	{
	"context": "${ExplainTasksPromptTemplate.EXPLAIN_TASKS_CONTEXT}",
	"tasks": ${JSON.stringify(tasks)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateExplainTasksPrompt };
