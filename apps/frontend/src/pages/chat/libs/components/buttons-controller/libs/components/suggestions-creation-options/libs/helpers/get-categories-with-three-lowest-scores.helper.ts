import { NumericalValue } from "~/libs/enums/enums.js";
import { type QuizScoresGetAllItemResponseDto } from "~/modules/quiz/quiz.js";

const getCategoriesWithThreeLowestScores = (
	categories: QuizScoresGetAllItemResponseDto[],
): QuizScoresGetAllItemResponseDto[] => {
	const categoriesSorted = categories.toSorted((a, b) => a.score - b.score);

	return categoriesSorted.slice(NumericalValue.ZERO, NumericalValue.THREE);
};

export { getCategoriesWithThreeLowestScores };
