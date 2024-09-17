import { type z } from "zod";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	AIAssistantMessageValidationSchema,
	type OpenAiResponseMessage,
} from "~/libs/modules/open-ai/open-ai.js";

import { type TaskSuggestionsResponseDto } from "../../types/types.js";
import { type changeTaskByCategory } from "./change-task.validation-schema.js";

type TaskByCategoryData = z.infer<typeof changeTaskByCategory>;

const generateChangeTaskSuggestionsResponse = (
	aiResponse: OpenAiResponseMessage,
	taskDeadLine: string,
): null | TaskSuggestionsResponseDto => {
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

	return {
		message: resultData.message,
		tasks: [
			{
				categoryId: Number(resultData.tasks.categoryId),
				categoryName: resultData.tasks.categoryName,
				description: resultData.tasks.description,
				dueDate: taskDeadLine,
				label: resultData.tasks.label,
			},
		],
	};
};

export { generateChangeTaskSuggestionsResponse };
