import {
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskCreateDto } from "../../types/types.js";
import { ChangeTaskPromptTemplates } from "./change-task-message.enum.js";

function generaChangeTaskPrompt(task: TaskCreateDto): OpenAiRequestMessage {
	const promptContent = {
		context: ChangeTaskPromptTemplates.CHANGE_TASKS_CONTEXT,
		task,
	};

	return {
		content: JSON.stringify(promptContent),
		role: OpenAiRoleKey.USER,
	};
}

export { generaChangeTaskPrompt };
