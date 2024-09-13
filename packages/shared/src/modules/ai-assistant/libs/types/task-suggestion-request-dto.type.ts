type SelectedCategories = {
	categoryId: string;
	name: string;
};

type TaskSuggestionRequestDto = {
	categories: SelectedCategories[];
	threadId: string;
};

export { type SelectedCategories, type TaskSuggestionRequestDto };
