import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ChangeTaskPromptTemplates } from "./change-task-template.enum.js";

function generaChangeTaskPrompt(
	task: TaskCreateDto,
	context: string = ChangeTaskPromptTemplates.CHANGE_TASKS_CONTEXT,
): OpenAiRequestMessage {
	/* eslint-disable perfectionist/sort-objects */
	return {
		content: JSON.stringify({ context, task }),
		role: OpenAIRoleKey.USER,
	};
}

export { generaChangeTaskPrompt };
