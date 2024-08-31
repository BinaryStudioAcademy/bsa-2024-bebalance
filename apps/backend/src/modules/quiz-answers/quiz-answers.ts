import { categoryService } from "../categories/categories.js";
import { quizQuestionService } from "../quiz-questions/quiz-questions.js";
import { QuizAnswerModel } from "./quiz-answer.model.js";
import { QuizAnswerRepository } from "./quiz-answer.repository.js";
import { QuizAnswerService } from "./quiz-answer.service.js";

const quizAnswerRepository = new QuizAnswerRepository(QuizAnswerModel);
const quizAnswerService = new QuizAnswerService(
	quizAnswerRepository,
	categoryService,
	quizQuestionService,
);

export {
	type QuizAnswerDto,
	type QuizAnswersRequestDto,
	type QuizAnswersResponseDto,
	type QuizUserAnswerDto,
} from "./libs/types/types.js";
export { QuizAnswerEntity } from "./quiz-answer.entity.js";
export { QuizAnswerModel } from "./quiz-answer.model.js";
export { QuizAnswerService } from "./quiz-answer.service.js";
export { quizAnswerService };
