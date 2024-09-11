import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

import { type SelectedCategoryIds } from "../../types/types";

const getAllCategoryIds = (
	categories: QuizScoresGetAllItemResponseDto[],
): SelectedCategoryIds => {
	return categories.map(({ id }) => id);
};

export { getAllCategoryIds };
