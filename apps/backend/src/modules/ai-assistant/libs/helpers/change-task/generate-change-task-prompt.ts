import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ChangeTaskPromptTemplate } from "./change-task-prompt-template.enum.js";

function generateChangeTaskPrompt(task: TaskCreateDto): OpenAiRequestMessage {
	const content = `
	{
	"context": "${ChangeTaskPromptTemplate.CHANGE_TASKS_CONTEXT}",
	"task": ${JSON.stringify(task)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateChangeTaskPrompt };
