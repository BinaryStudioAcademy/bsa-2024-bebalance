import { ChatMessageAuthor, ChatMessageType } from "shared";
import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAiResponseMessage,
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
	aiResponse: OpenAiResponseMessage,
	task: TaskCreateDto,
	lastMessageId: number,
): AIAssistantResponseDto | null => {
	const message = aiResponse.getPaginatedItems().shift();

	if (!message) {
		return null;
	}

	const parsedResult = AIAssistantMessageValidationSchema.safeParse(message);

	if (!parsedResult.success) {
		return null;
	}

	const contentText: string = parsedResult.data.content[ZERO_INDEX].text.value;
	const resultData: TaskByCategoryData = JSON.parse(
		contentText,
	) as TaskByCategoryData;

	const textMessage: ChatMessageDto = {
		author: OpenAIRoleKey.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: lastMessageId++,
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
		id: lastMessageId++,
		isRead: false,
		payload: {
			task: {
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: task.description,
				dueDate: task.dueDate,
				label: task.label,
			},
		},
		type: "task",
	};

	const acceptTaskQuestion = {
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: lastMessageId++,
		isRead: false,
		payload: {
			buttons: [
				{
					label: "Yes, accepts the task",
					value: "Yes, accepts the task",
				},
				{
					label: "No, I would like to try something else",
					value: "No, I would like to try something else",
				},
			],
			text: resultData.message.question,
		},
		type: ChatMessageType.QUESTION_WITH_BUTTONS,
	};

	return {
		messages: [textMessage, taskMessage, acceptTaskQuestion],
		threadId: message.thread_id,
	};
};

export { generateExplainTaskSuggestionsResponse };
