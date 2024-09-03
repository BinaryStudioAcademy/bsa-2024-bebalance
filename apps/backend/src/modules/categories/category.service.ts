import { type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import {
	type CategoryDto,
	type CategoryWithScoresDto,
	type CreateCategoryRequestDto,
	type GetCategoriesDto,
	type QuizScoreDto,
	type QuizScoreRequestDto,
	type UpdateCategoryRequestDto,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	private parseEntityToCategoryDto(
		categoryEntity: CategoryEntity,
	): CategoryDto {
		const { createdAt, id, name, updatedAt } = categoryEntity.toObject();

		return { createdAt, id, name, updatedAt };
	}

	private parseEntityToCategoryWithScoresDto(
		categoryEntity: CategoryEntity,
	): CategoryWithScoresDto {
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

	public async create(payload: CreateCategoryRequestDto): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.create(
			CategoryEntity.initializeNew(payload),
		);

		return this.parseEntityToCategoryDto(categoryEntity);
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
			? this.parseEntityToCategoryDto(categoryEntity)
			: null;
	}

	public async findAll(): Promise<GetCategoriesDto> {
		const entities = await this.categoryRepository.findAll();

		return {
			items: entities.map((entity) => this.parseEntityToCategoryDto(entity)),
		};
	}

	public async findAllWithScores(): Promise<{
		items: CategoryWithScoresDto[];
	}> {
		const categories = await this.categoryRepository.findAll();

		const items = categories.map((categoryEntity) => {
			return this.parseEntityToCategoryWithScoresDto(categoryEntity);
		});

		return { items };
	}

	public async update(
		id: number,
		payload: UpdateCategoryRequestDto,
	): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.update(id, payload);

		return this.parseEntityToCategoryDto(categoryEntity);
	}
}

export { CategoryService };
