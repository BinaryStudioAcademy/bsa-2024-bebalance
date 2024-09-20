import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import {
	type AIAssistantResponseDto,
	type ChatMessageDto,
} from "../../types/types.js";
import { type changeTaskByCategory } from "./change-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof changeTaskByCategory>;

const generateChangeTaskSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
	taskDeadLine: string,
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
			text: resultData.message,
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
				categoryId: resultData.tasks.categoryId,
				categoryName: resultData.tasks.categoryName,
				description: resultData.tasks.description,
				dueDate: taskDeadLine,
				label: resultData.tasks.label,
			},
		},
		type: "task",
	};

	return {
		messages: [textMessage, taskMessage],
		threadId: message.thread_id,
	};
};

export { generateChangeTaskSuggestionsResponse };
