import { type TaskCreateDto } from "~/modules/tasks/tasks.js";

const updateSuggestions = (
	oldSuggestions: TaskCreateDto[],
	newSuggestions: TaskCreateDto[],
): TaskCreateDto[] => {
	const returnMap = new Map(
		newSuggestions.map((suggestion) => [suggestion.categoryId, suggestion]),
	);

	return oldSuggestions.map(
		(suggestion) => returnMap.get(suggestion.categoryId) || suggestion,
	);
};

export { updateSuggestions };
