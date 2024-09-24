import { ChatMessageAuthor, ChatMessageType, HTTPCode } from "shared";
import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import { OpenAIErrorMessage } from "~/libs/modules/open-ai/libs/enums/open-ai-error-template.enum.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import { OpenAIError } from "../../exceptions/exceptions.js";
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

	try {
		const parsedResult = AIAssistantMessageValidationSchema.parse(message);

		const contentText: string =
			parsedResult.content[FIRST_ITEM_INDEX].text.value;
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
	} catch {
		throw new OpenAIError({
			message: OpenAIErrorMessage.WRONG_RESPONSE,
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}
};

export { generateExplainTasksSuggestionsResponse };
