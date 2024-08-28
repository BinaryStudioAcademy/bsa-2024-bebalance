import { type Repository } from "~/libs/types/types.js";

import { QuizCategoryEntity } from "./quiz-category.entity.js";
import { type QuizCategoryModel } from "./quiz-category.model.js";

class QuizCategoryRepository implements Repository {
	private quizCategoryModel: typeof QuizCategoryModel;

	public constructor(quizCategoryModel: typeof QuizCategoryModel) {
		this.quizCategoryModel = quizCategoryModel;
	}

	create(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}

	delete(): Promise<boolean> {
		throw new Error("Method not implemented.");
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
		throw new Error("Method not implemented.");
	}
}

export { QuizCategoryRepository };
