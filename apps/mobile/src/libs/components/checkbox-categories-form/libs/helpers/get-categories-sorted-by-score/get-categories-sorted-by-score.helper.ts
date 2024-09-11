import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

const getCategoriesSortedByScore = (
	categoriesData: QuizScoresGetAllItemResponseDto[],
): QuizScoresGetAllItemResponseDto[] => {
	return categoriesData
		.map((categoryItem) => ({ ...categoryItem }))
		.sort((a, b) => a.score - b.score);
};

export { getCategoriesSortedByScore };
