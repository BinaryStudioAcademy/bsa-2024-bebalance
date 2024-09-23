import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { ChatMessageAuthor, ChatMessageType } from "../../enums/enums.js";
import { type ChatMessageCreateDto } from "../../types/types.js";
import { type changeTaskByCategory } from "./change-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof changeTaskByCategory>;

const generateChangeTaskSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
	taskDeadLine: string,
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
		author: ChatMessageAuthor.ASSISTANT,
		payload: {
			text: resultData.message,
		},
		threadId: message.thread_id,
		type: ChatMessageType.TEXT,
	};

	const taskMessage: ChatMessageCreateDto = {
		author: ChatMessageAuthor.ASSISTANT,
		payload: {
			task: {
				categoryId: resultData.tasks.categoryId,
				categoryName: resultData.tasks.categoryName,
				description: resultData.tasks.description,
				dueDate: taskDeadLine,
				label: resultData.tasks.label,
			},
		},
		threadId: message.thread_id,
		type: ChatMessageType.TASK,
	};

	return [textMessage, taskMessage];
};

export { generateChangeTaskSuggestionsResponse };
