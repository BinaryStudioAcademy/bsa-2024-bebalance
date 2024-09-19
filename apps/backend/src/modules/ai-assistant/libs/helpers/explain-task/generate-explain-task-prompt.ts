import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ExplainTaskPromptTemplates } from "./explain-task-prompt-template.js";

function generateExplainTaskPrompt(task: TaskCreateDto): OpenAiRequestMessage {
	const content = `
	{
	"context": "${ExplainTaskPromptTemplates.EXPLAIN_TASK_CONTEXT}",
	"task": ${JSON.stringify(task)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateExplainTaskPrompt };
