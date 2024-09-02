import { ErrorMessage, RelationName } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryModel } from "./category.model.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";
import {
	type CategoryScoreModel,
	type QuizScoreDto,
} from "./libs/types/types.js";

class CategoryRepository implements Repository {
	private categoryModel: typeof CategoryModel;

	public constructor(categoryModel: typeof CategoryModel) {
		this.categoryModel = categoryModel;
	}

	public create(): Promise<unknown> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
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

	public delete(): Promise<boolean> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
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

	public update(): Promise<unknown> {
		throw new CategoryError({ message: ErrorMessage.READONLY_CATEGORY });
	}
}

export { CategoryRepository };
