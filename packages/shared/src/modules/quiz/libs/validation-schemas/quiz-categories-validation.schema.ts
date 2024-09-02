import { z } from "zod";

import { QuizCategoriesValidationMessage } from "../enums/quiz-categories-validation-message.enum.js";

const MIN_CATEGORIES_SELECTED = 1;

const quizCategoriesValidationSchema = z.object({
	categories: z
		.array(z.number())
		.min(
			MIN_CATEGORIES_SELECTED,
			QuizCategoriesValidationMessage.AT_LEAST_ONE_CATEGORY,
		),
});

export { quizCategoriesValidationSchema };
