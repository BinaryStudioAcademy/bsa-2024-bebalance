import { type TaskCreateDto } from "~/modules/tasks/tasks.js";

import { type TaskMessage } from "../../libs/types/types.js";

const createTaskMessagesFromSuggestions = (
	suggestions: TaskCreateDto[],
): TaskMessage[] => {
	const taskMessages: TaskMessage[] = [];

	for (const suggestion of suggestions) {
		taskMessages.push({
			task: {
				categoryId: suggestion.categoryId,
				categoryName: suggestion.categoryName,
				description: suggestion.description,
				label: suggestion.label,
			},
		});
	}

	return taskMessages;
};

export { createTaskMessagesFromSuggestions };
