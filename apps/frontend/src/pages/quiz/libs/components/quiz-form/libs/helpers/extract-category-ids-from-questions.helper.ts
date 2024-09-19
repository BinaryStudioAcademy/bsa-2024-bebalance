import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { type QuizQuestionDto } from "~/modules/quiz/quiz.js";

function extractCategoryIdsFromQuestions(
	questions: QuizQuestionDto[][],
): number[] {
	const categoryIds = new Set<number>();

	for (const questionsInsideCategory of questions) {
		categoryIds.add(
			(questionsInsideCategory[ZERO_INDEX] as QuizQuestionDto).categoryId,
		);
	}

	return [...categoryIds];
}

export { extractCategoryIdsFromQuestions };
