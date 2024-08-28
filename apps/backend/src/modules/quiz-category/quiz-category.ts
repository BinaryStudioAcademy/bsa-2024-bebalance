import { QuizCategoryModel } from "./quiz-category.model.js";
import { QuizCategoryRepository } from "./quiz-category.repository.js";
import { QuizCategoryService } from "./quiz-category.service.js";

const quizCategoryRepository = new QuizCategoryRepository(QuizCategoryModel);
const quizCategoryService = new QuizCategoryService(quizCategoryRepository);

export { type QuizCategoryDto } from "./libs/types/types.js";
export { QuizCategoryService } from "./quiz-category.service.js";
export { quizCategoryService };
