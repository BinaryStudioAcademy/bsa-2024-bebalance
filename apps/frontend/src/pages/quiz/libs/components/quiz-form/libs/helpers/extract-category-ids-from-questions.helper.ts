import { type QuizQuestionDto } from "~/modules/quiz/quiz.js";

function extractCategoryIdsFromQuestions(
	questions: QuizQuestionDto[][],
): number[] {
	const categoryIds = new Set<number>();

	for (const questionsInsideCategory of questions) {
		for (const question of questionsInsideCategory) {
			categoryIds.add(question.categoryId);
		}
	}

	return [...categoryIds];
}

export { extractCategoryIdsFromQuestions };
