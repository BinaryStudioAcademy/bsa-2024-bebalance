import { CategoryModel } from "./category.model.js";
import { CategoryRepository } from "./category.repository.js";
import { CategoryService } from "./category.service.js";

const categoryRepository = new CategoryRepository(CategoryModel);
const categoryService = new CategoryService(categoryRepository);

export { CategoryService } from "./category.service.js";
export {
	type QuizCategoryDto,
	type QuizGetAllCategoriesResponseDto,
	type QuizScoreDto,
	type QuizScoreResponseDto,
} from "./libs/types/types.js";
export { categoryService };
