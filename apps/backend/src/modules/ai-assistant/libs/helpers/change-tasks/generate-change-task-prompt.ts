import {
	type OpenAIRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ChangeTasksPromptTemplate } from "./change-task-prompt-template.enum.js";

function generateChangeTasksPrompt(
	tasks: TaskCreateDto[],
): OpenAIRequestMessage {
	const content = `
	{
	"context": "${ChangeTasksPromptTemplate.CHANGE_TASKS_CONTEXT}",
	"tasks": ${JSON.stringify(tasks)},
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateChangeTasksPrompt };
