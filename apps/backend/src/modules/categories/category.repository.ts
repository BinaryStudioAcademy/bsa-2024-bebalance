import { RelationName } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryModel } from "./category.model.js";
import {
	type CategoryScoreModel,
	type CategoryUpdateRequestDto,
	type QuizScoreDto,
} from "./libs/types/types.js";

class CategoryRepository implements Repository {
	private categoryModel: typeof CategoryModel;

	public constructor(categoryModel: typeof CategoryModel) {
		this.categoryModel = categoryModel;
	}

	public async create(entity: CategoryEntity): Promise<CategoryEntity> {
		const { name } = entity.toNewObject();

		const category = await this.categoryModel
			.query()
			.insert({ name })
			.withGraphFetched(RelationName.SCORES)
			.returning("*");

		return CategoryEntity.initialize({
			createdAt: category.createdAt,
			id: category.id,
			name: category.name,
			scores: category.scores,
			updatedAt: category.updatedAt,
		});
	}

	public async createScore({
		categoryId,
		score,
		userId,
	}: {
		categoryId: number;
		score: number;
		userId: number;
	}): Promise<QuizScoreDto> {
		const category = await this.categoryModel
			.query()
			.findById(categoryId)
			.castTo<CategoryModel>();

		await category
			.$relatedQuery<CategoryScoreModel>(RelationName.SCORES)
			.relate({ id: userId, score });

		return await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.findOne({ categoryId, userId })
			.castTo<QuizScoreDto>();
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowCount = await this.categoryModel.query().deleteById(id);

		return Boolean(deletedRowCount);
	}

	public async deleteUserScores(userId: number): Promise<number> {
		return await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.where({ userId })
			.delete();
	}

	public async find(id: number): Promise<CategoryEntity | null> {
		const category = await this.categoryModel
			.query()
			.findById(id)
			.withGraphJoined(RelationName.SCORES);

		return category
			? CategoryEntity.initialize({
					createdAt: category.createdAt,
					id: category.id,
					name: category.name,
					scores: category.scores,
					updatedAt: category.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<CategoryEntity[]> {
		const categories = await this.categoryModel.query().select("*");

		return await Promise.all(
			categories.map(async (category) => {
				const scoresModel = await this.categoryModel
					.query()
					.from(DatabaseTableName.QUIZ_SCORES)
					.where({ categoryId: category.id })
					.castTo<CategoryModel[]>();

				const scoreEntities = scoresModel.map((score) => {
					return CategoryEntity.initializeNew(score);
				});

				return CategoryEntity.initialize({
					createdAt: category.createdAt,
					id: category.id,
					name: category.name,
					scores: scoreEntities,
					updatedAt: category.updatedAt,
				});
			}),
		);
	}

	public async findByIds(categoryIds: number[]): Promise<CategoryEntity[]> {
		const categories = await this.categoryModel
			.query()
			.whereIn("id", categoryIds)
			.select("*");

		return await Promise.all(
			categories.map(async (category) => {
				const scoresModel = await this.categoryModel
					.query()
					.from(DatabaseTableName.QUIZ_SCORES)
					.where({ categoryId: category.id })
					.castTo<CategoryModel[]>();

				const scoreEntities = scoresModel.map((score) => {
					return CategoryEntity.initializeNew(score);
				});

				return CategoryEntity.initialize({
					createdAt: category.createdAt,
					id: category.id,
					name: category.name,
					scores: scoreEntities,
					updatedAt: category.updatedAt,
				});
			}),
		);
	}

	public async findScoreByUser(userId: number): Promise<CategoryEntity | null> {
		const scoreModel = await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.findOne({ userId })
			.castTo<CategoryScoreModel | null>();

		return scoreModel
			? CategoryEntity.initialize({
					createdAt: scoreModel.createdAt,
					id: scoreModel.id,
					name: scoreModel.name,
					score: scoreModel.score,
					scores: [],
					updatedAt: scoreModel.updatedAt,
					userId: scoreModel.userId,
				})
			: null;
	}

	public async findUserScores(userId: number): Promise<CategoryEntity[]> {
		const categories = await this.categoryModel.query().select("*");

		return await Promise.all(
			categories.map(async (category) => {
				const scoresModel = await this.categoryModel
					.query()
					.from(DatabaseTableName.QUIZ_SCORES)
					.where({ categoryId: category.id, userId })
					.returning("*")
					.castTo<CategoryScoreModel[]>();

				const scoreEntities = scoresModel.map((score) => {
					return CategoryEntity.initialize(score);
				});

				return CategoryEntity.initialize({
					createdAt: category.createdAt,
					id: category.id,
					name: category.name,
					scores: scoreEntities,
					updatedAt: category.updatedAt,
				});
			}),
		);
	}

	public async update(
		id: number,
		payload: CategoryUpdateRequestDto,
	): Promise<CategoryEntity> {
		const category = await this.categoryModel
			.query()
			.patchAndFetchById(id, { ...payload })
			.withGraphJoined(RelationName.SCORES);

		return CategoryEntity.initialize({
			createdAt: category.createdAt,
			id: category.id,
			name: category.name,
			scores: category.scores,
			updatedAt: category.updatedAt,
		});
	}

	public async updateScore({
		categoryId,
		score,
		userId,
	}: {
		categoryId: number;
		score: number;
		userId: number;
	}): Promise<CategoryEntity> {
		const categoryModel = await this.categoryModel
			.query()
			.findById(categoryId)
			.castTo<CategoryModel>();

		await categoryModel
			.$relatedQuery<CategoryScoreModel>(RelationName.SCORES)
			.where({ userId })
			.patch({ score });

		const scoreModel = await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.findOne({ categoryId, userId })
			.castTo<CategoryScoreModel>();

		return CategoryEntity.initialize({
			categoryId: categoryModel.id,
			createdAt: scoreModel.createdAt,
			id: scoreModel.id,
			name: categoryModel.name,
			score: scoreModel.score,
			scores: [],
			updatedAt: scoreModel.updatedAt,
			userId: scoreModel.userId,
		});
	}
}

export { CategoryRepository };
