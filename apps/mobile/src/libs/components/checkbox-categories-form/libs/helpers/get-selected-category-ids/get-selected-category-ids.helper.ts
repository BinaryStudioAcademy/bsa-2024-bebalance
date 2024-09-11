import { ZERO_INDEX } from "~/libs/constants/constants";
import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

import { type SelectedCategoryIds } from "../../types/types";

const LOWEST_SCORE_CATEGORIES_QUANTITY = 3;

const getSelectedCategoryIds = (
	sortedCategories: QuizScoresGetAllItemResponseDto[],
): SelectedCategoryIds => {
	return sortedCategories
		.slice(ZERO_INDEX, LOWEST_SCORE_CATEGORIES_QUANTITY)
		.map(({ id }) => id);
};

export { getSelectedCategoryIds };
