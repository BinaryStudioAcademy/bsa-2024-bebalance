import { type z } from "zod";

import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	OpenAIErrorMessage,
	type OpenAIResponseMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";

import {
	ChatMessageAuthor,
	ChatMessageType,
	HTTPCode,
} from "../../enums/enums.js";
import { OpenAIError } from "../../exceptions/exceptions.js";
import { type ChatMessageCreateDto } from "../../types/types.js";
import { type explainTasks } from "./explain-tasks.validation-schema.js";

type TaskByCategoryData = z.infer<typeof explainTasks>;

const generateExplainTasksSuggestionsResponse = (
	aiResponse: OpenAIResponseMessage,
): ChatMessageCreateDto[] | null => {
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

		const textMessage: ChatMessageCreateDto = {
			author: OpenAIRoleKey.ASSISTANT,
			payload: {
				text: resultData.message,
			},
			threadId: message.thread_id,
			type: ChatMessageType.TEXT,
		};

		const tasksMessages: ChatMessageCreateDto[] = resultData.tasks.map(
			(task) => {
				return {
					author: ChatMessageAuthor.ASSISTANT,
					payload: {
						task: {
							categoryId: task.categoryId,
							categoryName: task.categoryName,
							description: task.description,
							label: task.label,
						},
						text: task.explanation,
					},
					threadId: message.thread_id,
					type: ChatMessageType.TASK,
				};
			},
		);

		return [textMessage, ...tasksMessages];
	} catch {
		throw new OpenAIError({
			message: OpenAIErrorMessage.WRONG_RESPONSE,
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}
};

export { generateExplainTasksSuggestionsResponse };
