import { ZERO_INDEX } from "~/libs/constants/constants";
import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

const LOWEST_SCORE_CATEGORIES_QUANTITY = 3;

const getSelectedCategoryIds = (
	sortedCategories: QuizScoresGetAllItemResponseDto[],
): number[] => {
	return sortedCategories
		.slice(ZERO_INDEX, LOWEST_SCORE_CATEGORIES_QUANTITY)
		.map(({ id }) => id);
};

export { getSelectedCategoryIds };
