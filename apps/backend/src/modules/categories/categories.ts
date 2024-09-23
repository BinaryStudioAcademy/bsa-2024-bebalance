import { logger } from "~/libs/modules/logger/logger.js";

import { CategoryController } from "./category.controller.js";
import { CategoryModel } from "./category.model.js";
import { CategoryRepository } from "./category.repository.js";
import { CategoryService } from "./category.service.js";

const categoryRepository = new CategoryRepository(CategoryModel);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(logger, categoryService);

export { CategoryModel } from "./category.model.js";
export { CategoryService } from "./category.service.js";
export {
	type QuizScoreDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresResponseDto,
	type QuizScoresUpdateRequestDto,
} from "./libs/types/types.js";
export { categoryController, categoryService };
export { updateScoresValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
