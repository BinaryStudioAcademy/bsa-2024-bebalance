import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import { EMPTY_ARRAY_LENGTH } from "./libs/constants/constants.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";
import {
	type CategoryDto,
	type CategoryRequestDto,
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
		payload: Partial<CategoryRequestDto>,
	): Promise<CategoryDto> {
		const categoryEntity = await this.categoryRepository.update(id, payload);

		return this.convertCategoryEntityToDto(categoryEntity);
	}

	public async updateScores(
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

		const missingCategoryIds = payloadCategoryIds.filter(
			(categoryId) => !allCategoryIds.has(categoryId),
		);

		if (missingCategoryIds.length > EMPTY_ARRAY_LENGTH) {
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
