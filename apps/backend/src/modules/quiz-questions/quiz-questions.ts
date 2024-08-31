import { QuizQuestionModel } from "./quiz-question.model.js";
import { QuizQuestionRepository } from "./quiz-question.repository.js";
import { QuizQuestionService } from "./quiz-question.service.js";

const quizQuestionRepository = new QuizQuestionRepository(QuizQuestionModel);
const quizQuestionService = new QuizQuestionService(quizQuestionRepository);

export { QuizQuestionService } from "./quiz-question.service.js";
export { quizQuestionService };
