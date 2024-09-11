import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

const PLACE_AFTER_VALUE = 1;
const PLACE_BEFORE_VALUE = -1;
const STAY_IN_PLACE_VALUE = 0;

const getCategoriesSortedByScore = (
	categoriesData: QuizScoresGetAllItemResponseDto[],
): QuizScoresGetAllItemResponseDto[] => {
	return categoriesData
		.map((categoryItem) => ({ ...categoryItem }))
		.sort((a, b) => {
			if (a.score < b.score) {
				return PLACE_BEFORE_VALUE;
			}

			if (a.score > b.score) {
				return PLACE_AFTER_VALUE;
			}

			return STAY_IN_PLACE_VALUE;
		});
};

export { getCategoriesSortedByScore };
