import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { ChatMessageAuthor, ChatMessageType } from "../../enums/enums.js";
import {
	type ChatMessageCreateDto,
	type TaskCreateDto,
} from "../../types/types.js";
import { type explainTask } from "./explain-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof explainTask>;

const generateExplainTaskSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
	task: TaskCreateDto,
): ChatMessageCreateDto[] | null => {
	const message = aiResponse.getPaginatedItems().shift();

	if (!message) {
		return null;
	}

	const parsedResult = AIAssistantMessageValidationSchema.safeParse(message);

	if (!parsedResult.success) {
		return null;
	}

	const contentText: string =
		parsedResult.data.content[FIRST_ITEM_INDEX].text.value;
	const resultData: TaskByCategoryData = JSON.parse(
		contentText,
	) as TaskByCategoryData;

	const textMessage: ChatMessageCreateDto = {
		author: OpenAIRoleKey.ASSISTANT,
		payload: {
			text:
				resultData.message.explanation +
				"\n\n" +
				resultData.message.suggestions +
				"\n\n" +
				resultData.message.steps,
		},
		threadId: message.thread_id,
		type: ChatMessageType.TEXT,
	};

	const taskMessage: ChatMessageCreateDto = {
		author: OpenAIRoleKey.ASSISTANT,
		payload: {
			task: {
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: task.description,
				dueDate: task.dueDate,
				label: task.label,
			},
		},
		threadId: message.thread_id,
		type: ChatMessageType.TEXT,
	};

	const motivationMessage: ChatMessageCreateDto = {
		author: ChatMessageAuthor.ASSISTANT,
		payload: {
			text: resultData.message.motivation_tips,
		},
		threadId: message.thread_id,
		type: ChatMessageType.TEXT,
	};

	return [textMessage, taskMessage, motivationMessage];
};

export { generateExplainTaskSuggestionsResponse };
