import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AiAssistantMessageValidationSchema,
	type OpenAiResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskSuggestionsResponseDto } from "../../types/types.js";
import { type ChangeTaskByCategory } from "./change-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof ChangeTaskByCategory>;

const generateChangeTaskSuggestionsResponse = (
	aiResponse: OpenAiResponseMessage,
): null | TaskSuggestionsResponseDto => {
	const message = aiResponse.getPaginatedItems().shift();

	if (!message) {
		return null;
	}

	const parsedResult = AiAssistantMessageValidationSchema.safeParse(message);

	if (parsedResult.success) {
		const contentText: string =
			parsedResult.data.content[ZERO_INDEX].text.value;
		const resultData: TaskByCategoryData = JSON.parse(
			contentText,
		) as TaskByCategoryData;

		return {
			message: resultData.message,
			tasks: [
				{
					categoryId: Number(resultData.task.categoryId),
					categoryName: resultData.task.categoryName,
					description: resultData.task.description,
					dueDate: resultData.task.dueDate,
					label: resultData.task.label,
				},
			],
		};
	}

	return null;
};

export { generateChangeTaskSuggestionsResponse };
