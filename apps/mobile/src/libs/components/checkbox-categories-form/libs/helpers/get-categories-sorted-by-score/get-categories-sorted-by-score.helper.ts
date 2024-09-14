import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

type GetCategoriesSortedByScoreArguments = {
	categories: QuizScoresGetAllItemResponseDto[];
	useDescendingOrder?: boolean;
};

const getCategoriesSortedByScore = ({
	categories,
	useDescendingOrder = false,
}: GetCategoriesSortedByScoreArguments): QuizScoresGetAllItemResponseDto[] => {
	return categories
		.map((categoryItem) => ({ ...categoryItem }))
		.sort((a, b) => {
			return useDescendingOrder ? b.score - a.score : a.score - b.score;
		});
};

export { getCategoriesSortedByScore };
