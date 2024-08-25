import { logger } from "~/libs/modules/logger/logger.js";

import { QuizController } from "./quiz.controller.js";
import { QuizQuestionsRepository } from "./quiz.repository.js";
import { QuizQuestionsService } from "./quiz.service.js";
import { QuizQuestionsModel } from "./quiz-questions.model.js";

const quizQuestionsRepository = new QuizQuestionsRepository(QuizQuestionsModel);
const quizService = new QuizQuestionsService(quizQuestionsRepository);
const quizController = new QuizController(logger, quizService);

export { QuizApiPath } from "./libs/enums/enums.js";
export {
	type QuizQuestionsDto,
	type QuizQuestionsGetAllReponseDto,
} from "./libs/types/types.js";

export { quizController };
