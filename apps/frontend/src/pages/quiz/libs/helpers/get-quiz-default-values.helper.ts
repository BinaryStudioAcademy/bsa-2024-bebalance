import { type QuizQuestionDto } from "~/libs/types/types.js";

const getQuizDefaultValues = (
	categorizedQuestions: QuizQuestionDto[][],
): Record<string, null | string> => {
	const defaultValues: Record<string, null | string> = {};

	const questions = categorizedQuestions.flat();

	for (const question of questions) {
		defaultValues[`question${question.id.toString()}`] = null;
	}

	return defaultValues;
};

export { getQuizDefaultValues };
