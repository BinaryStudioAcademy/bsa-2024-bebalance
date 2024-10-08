import { ZERO_INDEX } from "~/libs/constants/constants";
import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

const LOWEST_SCORE_CATEGORIES_QUANTITY = 3;

const getInitialSelectedCategoryIds = (
	sortedCategories: QuizScoresGetAllItemResponseDto[],
): number[] => {
	return sortedCategories
		.slice(ZERO_INDEX, LOWEST_SCORE_CATEGORIES_QUANTITY)
		.map(({ categoryId }) => categoryId);
};

export { getInitialSelectedCategoryIds };
