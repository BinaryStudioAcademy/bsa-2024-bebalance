import { categoryService } from "../categories/categories.js";
import { QuizAnswerModel } from "./quiz-answer.model.js";
import { QuizAnswerRepository } from "./quiz-answer.repository.js";
import { QuizAnswerService } from "./quiz-answer.service.js";

const quizAnswerRepository = new QuizAnswerRepository(QuizAnswerModel);
const quizAnswerService = new QuizAnswerService(
	quizAnswerRepository,
	categoryService,
);

export { QuizAnswerModel } from "./quiz-answer.model.js";
export { QuizAnswerService } from "./quiz-answer.service.js";
export { quizAnswerService };
