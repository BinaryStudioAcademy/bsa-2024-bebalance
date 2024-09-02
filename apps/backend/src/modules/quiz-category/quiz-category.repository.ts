import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { CategoryError } from "./libs/exceptions/exceptions.js";
import { QuizCategoryEntity } from "./quiz-category.entity.js";
import { type QuizCategoryModel } from "./quiz-category.model.js";

class QuizCategoryRepository implements Repository {
	private quizCategoryModel: typeof QuizCategoryModel;

	public constructor(quizCategoryModel: typeof QuizCategoryModel) {
		this.quizCategoryModel = quizCategoryModel;
	}

	create(): Promise<unknown> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
	}

	delete(): Promise<boolean> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
	}

	async find(id: number): Promise<null | QuizCategoryEntity> {
		const quizCategory = await this.quizCategoryModel.query().findById(id);

		if (!quizCategory) {
			return null;
		}

		return QuizCategoryEntity.initialize(quizCategory);
	}

	async findAll(): Promise<QuizCategoryEntity[]> {
		const quizCategories = await this.quizCategoryModel.query();

		return quizCategories.map((quizCategory) =>
			QuizCategoryEntity.initialize(quizCategory),
		);
	}

	update(): Promise<unknown> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
	}
}

export { QuizCategoryRepository };
