import { type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import {
	type CategoryDto,
	type CategoryRequestDto,
	type QuizScoreDto,
	type QuizScoreRequestDto,
	type QuizScoresResponseDto,
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

	public async create(payload: CategoryRequestDto): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.create(
			CategoryEntity.initializeNew(payload),
		);

		return this.convertCategoryEntityToDto(categoryEntity);
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

	public delete(id: number): Promise<boolean> {
		return this.categoryRepository.delete(id);
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

	public async findUserScores(userId: number): Promise<QuizScoresResponseDto> {
		const categoryEntities =
			await this.categoryRepository.findUserScores(userId);

		const scores = categoryEntities.map((scoreEntity) => {
			const score = scoreEntity.toObject();

			return {
				categoryId: score.categoryId,
				createdAt: score.createdAt,
				id: score.id,
				score: score.score,
				updatedAt: score.updatedAt,
				userId: score.userId,
			};
		});

		return { items: scores };
	}

	public async update(
		id: number,
		payload: Partial<CategoryRequestDto>,
	): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.update(id, payload);

		return this.convertCategoryEntityToDto(categoryEntity);
	}
}

export { CategoryService };
