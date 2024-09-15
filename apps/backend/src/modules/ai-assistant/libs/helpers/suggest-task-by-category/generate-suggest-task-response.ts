import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AiAssistantMessageValidationSchema,
	type OpenAiResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskSuggestionsResponseDto } from "../../types/types.js";
import { type TaskByCategory } from "./suggest-task-by-category.validation-schema.js";

type TaskByCategoryData = z.infer<typeof TaskByCategory>;

const generateTaskSuggestionsResponse = (
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
			tasks: resultData.tasks.map((task) => ({
				categoryId: Number(task.categoryId),
				categoryName: task.categoryName,
				description: task.description,
				dueDate: task.dueDate,
				label: task.label,
			})),
		};
	}

	return null;
};

export { generateTaskSuggestionsResponse };