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
} from "../../types/types.js";
import { type explainTasks } from "./explain-tasks.validation-schema.js";

type TaskByCategoryData = z.infer<typeof explainTasks>;

const generateExplainTasksSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
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
			text: resultData.message,
		},
		type: "text",
	};

	const tasksMessages: ChatMessageDto[] = resultData.tasks.map((task) => {
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
					label: task.label,
				},
				text: task.explanation,
			},
			type: ChatMessageType.TASK,
		};
	});

	return {
		messages: [textMessage, ...tasksMessages],
		threadId: message.thread_id,
	};
};

export { generateExplainTasksSuggestionsResponse };
