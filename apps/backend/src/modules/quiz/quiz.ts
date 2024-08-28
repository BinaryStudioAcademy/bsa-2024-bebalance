import { logger } from "~/libs/modules/logger/logger.js";

import { quizCategoryService } from "../quiz-category/quiz-category.js";
import { QuizController } from "./quiz.controller.js";

const quizController = new QuizController(logger, quizCategoryService);

export { type QuizCategoryDto } from "../quiz-category/quiz-category.js";
export { quizController };
