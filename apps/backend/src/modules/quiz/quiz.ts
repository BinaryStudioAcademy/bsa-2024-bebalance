import { logger } from "~/libs/modules/logger/logger.js";
import { quizAnswerService } from "~/modules/quiz-answers/quiz-answers.js";
import { quizCategoryService } from "~/modules/quiz-category/quiz-category.js";

import { QuizController } from "./quiz.controller.js";

const quizController = new QuizController({
	logger,
	quizAnswerService,
	quizCategoryService,
});

export { type QuizCategoryDto } from "../quiz-category/quiz-category.js";
export { QuizError } from "./libs/exceptions/exceptions.js";
export { quizController };
