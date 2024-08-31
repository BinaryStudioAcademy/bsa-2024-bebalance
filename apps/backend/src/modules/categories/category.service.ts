import { type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import {
	type CategoryDto,
	type CategoryRequestDto,
	type QuizScoreDto,
	type ScoreRequestDto,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public async create(payload: CategoryRequestDto): Promise<CategoryDto> {
		const category = await this.categoryRepository.create(
			CategoryEntity.initializeNew(payload),
		);

		return category.toObject();
	}

	public async createScore({
		categoryId,
		score,
		userId,
	}: ScoreRequestDto): Promise<QuizScoreDto> {
		return await this.categoryRepository.createScore({
			categoryId,
			score,
			userId,
		});
	}

	public delete(id: number): Promise<boolean> {
		return this.categoryRepository.delete(id);
	}

	public deleteUserScores(userId: number): Promise<number> {
		return this.categoryRepository.deleteUserScores(userId);
	}

	public async find(id: number): Promise<CategoryDto | null> {
		const category = await this.categoryRepository.find(id);

		return category ? category.toObject() : null;
	}

	public async findAll(): Promise<{ items: CategoryDto[] }> {
		const categories = await this.categoryRepository.findAll();

		return { items: categories.map((category) => category.toObject()) };
	}

	public async update(
		id: number,
		payload: Partial<CategoryRequestDto>,
	): Promise<CategoryDto> {
		const category = await this.categoryRepository.update(id, payload);

		return category.toObject();
	}
}

export { CategoryService };
