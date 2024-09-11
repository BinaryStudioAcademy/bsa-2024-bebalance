import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

const getAllCategoryIds = (
	categories: QuizScoresGetAllItemResponseDto[],
): number[] => {
	return categories.map(({ id }) => id);
};

export { getAllCategoryIds };
