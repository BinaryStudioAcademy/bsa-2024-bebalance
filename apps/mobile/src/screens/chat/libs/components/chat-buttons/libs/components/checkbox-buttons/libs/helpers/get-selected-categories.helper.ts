import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";
import { type SelectedCategory } from "~/packages/chat/chat";

const getSelectedCategoriesHelper = (
	quizCategories: QuizScoresGetAllItemResponseDto[],
	categoryIds: number[],
): SelectedCategory[] => {
	return quizCategories
		.filter((category) => categoryIds.includes(category.categoryId))
		.map((category) => ({
			id: category.categoryId,
			name: category.categoryName,
		}));
};

export { getSelectedCategoriesHelper };
