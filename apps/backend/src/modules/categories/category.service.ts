import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";
import {
	type CategoriesGetAllResponseDto,
	type CategoryCreateRequestDto,
	type CategoryDto,
	type CategoryUpdateRequestDto,
	type CategoryWithScoresDto,
	type QuizScoreDto,
	type QuizScoreRequestDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresResponseDto,
	type QuizScoresUpdateRequestDto,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	private convertCategoryEntityToDto(
		categoryEntity: CategoryEntity,
	): CategoryWithScoresDto {
		const category = categoryEntity.toObject();

		const scores: QuizScoreDto[] = category.scores.map(
			(scoreEntity: CategoryEntity) => {
				const score = scoreEntity.toObject();

				return { ...score, categoryId: category.id };
			},
		);

		const { createdAt, id, name, updatedAt } = category;

		return { createdAt, id, name, scores, updatedAt };
	}

	public async create(payload: CategoryCreateRequestDto): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.create(
			CategoryEntity.initializeNew(payload),
		);

		const { createdAt, id, name, updatedAt } =
			this.convertCategoryEntityToDto(categoryEntity);

		return { createdAt, id, name, updatedAt };
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

	public deleteUserScoresByCategoryIds(
		userId: number,
		categoryIds: number[],
	): Promise<number> {
		return this.categoryRepository.deleteUserScoresByCategoryIds(
			userId,
			categoryIds,
		);
	}

	public async find(id: number): Promise<CategoryDto | null> {
		const categoryEntity = await this.categoryRepository.find(id);

		if (!categoryEntity) {
			return null;
		}

		const { createdAt, name, updatedAt } =
			this.convertCategoryEntityToDto(categoryEntity);

		return { createdAt, id, name, updatedAt };
	}

	public async findAll(): Promise<CategoriesGetAllResponseDto> {
		const categories = await this.categoryRepository.findAll();

		const items = categories.map((categoryEntity) => {
			const { createdAt, id, name, updatedAt } =
				this.convertCategoryEntityToDto(categoryEntity);

			return { createdAt, id, name, updatedAt };
		});

		return { items };
	}

	public async findAllWithScores(): Promise<{
		items: CategoryWithScoresDto[];
	}> {
		const categories = await this.categoryRepository.findAll();

		const items = categories.map((categoryEntity) => {
			return this.convertCategoryEntityToDto(categoryEntity);
		});

		return { items };
	}

	public async findUserScores(
		userId: number,
	): Promise<QuizScoresGetAllResponseDto> {
		const categoryEntities =
			await this.categoryRepository.findUserScores(userId);

		const scores = categoryEntities.flatMap((categoryEntity) => {
			const category = this.convertCategoryEntityToDto(categoryEntity);

			return category.scores.map((score) => {
				return {
					categoryId: score.categoryId,
					categoryName: category.name,
					createdAt: score.createdAt,
					id: score.id,
					score: score.score,
					updatedAt: score.updatedAt,
					userId: score.userId,
				};
			});
		});

		return { items: scores };
	}

	public async update(
		id: number,
		payload: CategoryUpdateRequestDto,
	): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.update(id, payload);

		const { createdAt, name, updatedAt } =
			this.convertCategoryEntityToDto(categoryEntity);

		return { createdAt, id, name, updatedAt };
	}

	public async updateUserScores(
		payload: QuizScoresUpdateRequestDto,
		userId: number,
	): Promise<QuizScoresResponseDto> {
		const { items: scoresData } = payload;

		const userScore = await this.categoryRepository.findScoreByUser(userId);

		if (!userScore) {
			throw new CategoryError({
				message: ErrorMessage.SCORES_UPDATE_UNAVAILABLE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const allCategories = await this.categoryRepository.findAll();
		const allCategoryIds = new Set(
			allCategories.map((category) => category.toObject().id),
		);

		const payloadCategoryIds = scoresData.map(
			(payloadScore) => payloadScore.categoryId,
		);

		const hasMissingCategoryIds = payloadCategoryIds.some(
			(categoryId) => !allCategoryIds.has(categoryId),
		);

		if (hasMissingCategoryIds) {
			throw new CategoryError({
				message: ErrorMessage.INVALID_CATEGORY,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const scores = await Promise.all(
			scoresData.map(async (payloadScore) => {
				const { categoryId, score } = payloadScore;

				const scoreEntity = await this.categoryRepository.updateScore({
					categoryId,
					score,
					userId,
				});

				return scoreEntity.toObject();
			}),
		);

		const items = scores.map((score) => {
			return {
				categoryId: score.categoryId,
				createdAt: score.createdAt,
				id: score.id,
				score: score.score,
				updatedAt: score.updatedAt,
				userId: score.userId,
			};
		});

		return { items };
	}
}

export { CategoryService };
