import { type Service } from "~/libs/types/types.js";

import { type CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import {
	type CategoryDto,
	type QuizScoreDto,
	type QuizScoreRequestDto,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public convertCategoryEntityToDto(
		categoryEntity: CategoryEntity,
	): CategoryDto {
		const category = categoryEntity.toObject();

		const scores: QuizScoreDto[] = category.scores.map(
			(scoreEntity: CategoryEntity) => {
				const score = scoreEntity.toObject();

				return {
					...score,
					categoryId: category.id,
				};
			},
		);

		return {
			...category,
			scores,
		};
	}

	public create(): Promise<unknown> {
		return this.categoryRepository.create();
	}

	public async createScore({
		categoryId,
		score,
		userId,
	}: QuizScoreRequestDto): Promise<QuizScoreDto> {
		return await this.categoryRepository.createScore({
			categoryId,
			score,
			userId,
		});
	}

	public delete(): Promise<boolean> {
		return this.categoryRepository.delete();
	}

	public deleteUserScores(userId: number): Promise<number> {
		return this.categoryRepository.deleteUserScores(userId);
	}

	public async find(id: number): Promise<CategoryDto | null> {
		const categoryEntity = await this.categoryRepository.find(id);

		return categoryEntity
			? this.convertCategoryEntityToDto(categoryEntity)
			: null;
	}

	public async findAll(): Promise<{ items: CategoryDto[] }> {
		const categories = await this.categoryRepository.findAll();

		const items = categories.map((categoryEntity) => {
			return this.convertCategoryEntityToDto(categoryEntity);
		});

		return { items };
	}

	public update(): Promise<unknown> {
		return this.categoryRepository.update();
	}
}

export { CategoryService };
