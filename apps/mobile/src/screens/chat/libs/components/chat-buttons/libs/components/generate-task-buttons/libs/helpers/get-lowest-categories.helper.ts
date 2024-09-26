import { type SelectedCategory } from "~/packages/chat/chat";
import { type QuizScoresGetAllItemResponseDto } from "~/packages/quiz/quiz";

const TOP_CATEGORIES_COUNT = 3;
const START_INDEX = 0;

const getLowestCategories = (
	scores: QuizScoresGetAllItemResponseDto[],
): SelectedCategory[] => {
	return [...scores]
		.sort((a, b) => a.score - b.score)
		.slice(START_INDEX, TOP_CATEGORIES_COUNT)
		.map(({ categoryId, categoryName }) => ({
			id: Number(categoryId),
			name: categoryName,
		}));
};

export { getLowestCategories };
