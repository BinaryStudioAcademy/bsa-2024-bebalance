type SelectedCategories = {
	categoryId: number;
	categoryName: string;
};

type TaskSuggestionRequestDto = {
	categories: SelectedCategories[];
	threadId: string;
};

export { type SelectedCategories, type TaskSuggestionRequestDto };
