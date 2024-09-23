import { type QuizScoresGetAllItemResponseDto } from "~/libs/types/types";

type GetCategoriesSortedByScoreArguments = {
	categories: QuizScoresGetAllItemResponseDto[];
	order?: "ASC" | "DESC";
};

const getCategoriesSortedByScore = ({
	categories,
	order = "ASC",
}: GetCategoriesSortedByScoreArguments): QuizScoresGetAllItemResponseDto[] => {
	const isAscendingOrder = order === "ASC";

	return categories
		.map((categoryItem) => ({ ...categoryItem }))
		.sort((a, b) => {
			return isAscendingOrder ? a.score - b.score : b.score - a.score;
		});
};

export { getCategoriesSortedByScore };
