import { type Service } from "~/libs/types/types.js";

import { type QuizCategoryDto } from "./libs/types/types.js";
import { type QuizCategoryRepository } from "./quiz-category.repository.js";

class QuizCategoryService implements Service {
	private quizCategoryRepository: QuizCategoryRepository;

	constructor(quizCategoryRepository: QuizCategoryRepository) {
		this.quizCategoryRepository = quizCategoryRepository;
	}

	create(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}

	delete(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async find(id: number): Promise<null | QuizCategoryDto> {
		const quizCategoryEntity = await this.quizCategoryRepository.find(id);

		if (!quizCategoryEntity) {
			return null;
		}

		return quizCategoryEntity.toObject();
	}

	async findAll(): Promise<{ items: QuizCategoryDto[] }> {
		const quizCategoryEntities = await this.quizCategoryRepository.findAll();

		return {
			items: quizCategoryEntities.map((quizCategoryEntity) => {
				return quizCategoryEntity.toObject();
			}),
		};
	}

	update(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}
}

export { QuizCategoryService };
