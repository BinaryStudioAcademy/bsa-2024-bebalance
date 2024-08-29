import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryModel } from "./category.model.js";
import { type Category, type ScoreRequestData } from "./libs/types/types.js";

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
			.returning("*");

		return CategoryEntity.initialize({
			categoryId: category.categoryId,
			createdAt: category.createdAt,
			id: category.id,
			name: category.name,
			score: category.score,
			updatedAt: category.updatedAt,
			userId: category.userId,
		});
	}

	public async createScore({
		categoryId,
		score,
		userId,
	}: ScoreRequestData): Promise<CategoryEntity> {
		const category = await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.insertAndFetch({
				categoryId,
				score,
				userId,
			});

		return CategoryEntity.initialize({
			categoryId: category.categoryId,
			createdAt: category.createdAt,
			id: category.id,
			name: category.name,
			score: category.score,
			updatedAt: category.updatedAt,
			userId: category.userId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowCount = await this.categoryModel.query().deleteById(id);

		return Boolean(deletedRowCount);
	}

	public async deleteUserScores(userId: number): Promise<number> {
		return await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.where("userId", userId)
			.delete();
	}

	public async find(
		payload: Partial<Category>,
	): Promise<CategoryEntity | null> {
		const category = await this.categoryModel.query().where(payload).first();

		return category
			? CategoryEntity.initialize({
					categoryId: category.categoryId,
					createdAt: category.createdAt,
					id: category.id,
					name: category.name,
					score: category.score,
					updatedAt: category.updatedAt,
					userId: category.userId,
				})
			: null;
	}

	public async findAll(): Promise<CategoryEntity[]> {
		const categories = await this.categoryModel.query().select("*");

		return categories.map((category) =>
			CategoryEntity.initialize({
				categoryId: category.categoryId,
				createdAt: category.createdAt,
				id: category.id,
				name: category.name,
				score: category.score,
				updatedAt: category.updatedAt,
				userId: category.userId,
			}),
		);
	}

	public async update(
		id: number,
		payload: Partial<Category>,
	): Promise<CategoryEntity> {
		const category = await this.categoryModel
			.query()
			.patchAndFetchById(id, { ...payload });

		return CategoryEntity.initialize({
			categoryId: category.categoryId,
			createdAt: category.createdAt,
			id: category.id,
			name: category.name,
			score: category.score,
			updatedAt: category.updatedAt,
			userId: category.userId,
		});
	}
}

export { CategoryRepository };
