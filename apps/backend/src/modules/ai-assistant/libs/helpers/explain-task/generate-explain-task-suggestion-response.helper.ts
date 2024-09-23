import { ChatMessageAuthor, ChatMessageType } from "shared";
import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import {
	type AIAssistantResponseDto,
	type ChatMessageDto,
	type TaskCreateDto,
} from "../../types/types.js";
import { type explainTask } from "./explain-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof explainTask>;

const generateExplainTaskSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
	task: TaskCreateDto,
): AIAssistantResponseDto | null => {
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

	const textMessage: ChatMessageDto = {
		author: OpenAIRoleKey.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: FIRST_ITEM_INDEX,
		isRead: false,
		payload: {
			text:
				resultData.message.explanation +
				"\n\n" +
				resultData.message.suggestions +
				"\n\n" +
				resultData.message.steps,
		},
		type: "text",
	};

	const taskMessage: ChatMessageDto = {
		author: OpenAIRoleKey.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: FIRST_ITEM_INDEX,
		isRead: false,
		payload: {
			task: {
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: task.description,
				label: task.label,
			},
		},
		type: "task",
	};

	const motivationMessage = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: FIRST_ITEM_INDEX,
		isRead: false,
		payload: {
			text: resultData.message.motivation_tips,
		},
		type: ChatMessageType.TEXT,
	};

	return {
		messages: [textMessage, taskMessage, motivationMessage],
		threadId: message.thread_id,
	};
};

export { generateExplainTaskSuggestionsResponse };
