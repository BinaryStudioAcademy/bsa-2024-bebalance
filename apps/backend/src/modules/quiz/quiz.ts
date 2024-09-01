import { logger } from "~/libs/modules/logger/logger.js";
import { quizAnswerService } from "~/modules/quiz-answers/quiz-answers.js";

import { categoryService } from "../categories/categories.js";
import { QuizController } from "./quiz.controller.js";

const quizController = new QuizController(
	logger,
	categoryService,
	quizAnswerService,
);

export { QuizError } from "./libs/exceptions/exceptions.js";
export { quizController };
