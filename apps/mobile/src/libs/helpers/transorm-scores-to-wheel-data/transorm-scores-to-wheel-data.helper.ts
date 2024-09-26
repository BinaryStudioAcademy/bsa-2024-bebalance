import { transformCategoryToGradientColors } from "~/libs/helpers/helpers";
import { type WheelDataItem } from "~/libs/types/types";
import { type QuizScoresGetAllItemResponseDto } from "~/packages/quiz/quiz";

const transformScoresToWheelData = (
	scores: QuizScoresGetAllItemResponseDto[],
): WheelDataItem[] => {
	return scores.map((value: QuizScoresGetAllItemResponseDto) => {
		const colors = transformCategoryToGradientColors(value.categoryName);

		return {
			colors,
			label: value.categoryName,
			score: value.score,
		};
	});
};

export { transformScoresToWheelData };
