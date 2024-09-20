import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { ChatMessageAuthor } from "../../enums/enums.js";
import {
	type AIAssistantResponseDto,
	type ChatMessageDto,
} from "../../types/types.js";
import { type taskByCategory } from "./suggest-task-by-category.validation-schema.js";

type TaskByCategoryData = z.infer<typeof taskByCategory>;

const generateTaskSuggestionsResponse = (
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

	const contentText: string =
		parsedResult.data.content[FIRST_ITEM_INDEX].text.value;
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

	const taskMessages: ChatMessageDto[] = resultData.tasks.map((task) => {
		return {
			author: ChatMessageAuthor.ASSISTANT,
			createdAt: new Date().toISOString(),
			id: lastMessageId++,
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
			type: "task",
		};
	});

	return {
		messages: [textMessage, ...taskMessages],
		threadId: message.thread_id,
	};
};

export { generateTaskSuggestionsResponse };
