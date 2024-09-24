import { ChatMessageAuthor, ChatMessageType } from "shared";
import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import {
	type AIAssistantResponseDto,
	type ChatMessageDto,
} from "../../types/types.js";
import { type changeTasksByCategory } from "./change-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof changeTasksByCategory>;

const generateChangeTasksSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
	taskDeadLine: string,
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
		author: ChatMessageAuthor.ASSISTANT,
		createdAt: new Date().toISOString(),
		id: FIRST_ITEM_INDEX,
		isRead: false,
		payload: {
			text: resultData.message,
		},
		type: ChatMessageType.TEXT,
	};

	const taskMessages: ChatMessageDto[] = resultData.tasks.map((task) => {
		return {
			author: ChatMessageAuthor.ASSISTANT,
			createdAt: new Date().toISOString(),
			id: FIRST_ITEM_INDEX,
			isRead: false,
			payload: {
				task: {
					categoryId: task.categoryId,
					categoryName: task.categoryName,
					description: task.description,
					dueDate: taskDeadLine,
					label: task.label,
				},
			},
			type: ChatMessageType.TASK,
		};
	});

	return {
		messages: [textMessage, ...taskMessages],
		threadId: message.thread_id,
	};
};

export { generateChangeTasksSuggestionsResponse };
