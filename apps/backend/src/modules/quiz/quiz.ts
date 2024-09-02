import { logger } from "~/libs/modules/logger/logger.js";
import { categoryService } from "~/modules/categories/categories.js";
import { quizAnswerService } from "~/modules/quiz-answers/quiz-answers.js";

import { QuizController } from "./quiz.controller.js";

const quizController = new QuizController({
	categoryService,
	logger,
	quizAnswerService,
});

export { QuizError } from "./libs/exceptions/exceptions.js";
export { quizController };
