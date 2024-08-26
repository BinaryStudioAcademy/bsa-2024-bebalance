import { userService } from "../users/users.js";
import { QuizAnswerModel } from "./quiz-answer.model.js";
import { QuizAnswerRepository } from "./quiz-answer.repository.js";
import { QuizAnswerService } from "./quiz-answer.service.js";

const quizAnswerRepository = new QuizAnswerRepository(QuizAnswerModel);
new QuizAnswerService(quizAnswerRepository, userService);

export { QuizAnswerModel } from "./quiz-answer.model.js";
