import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { type CategoryModel } from "./category.model.js";
import { type UserScore } from "./libs/types/types.js";

class CategoryRepository implements Repository {
	private categoryModel: typeof CategoryModel;

	public constructor(categoryModel: typeof CategoryModel) {
		this.categoryModel = categoryModel;
	}

	public create(): Promise<null> {
		return Promise.resolve(null);
	}

	public async createScore({
		categoryId,
		score,
		userId,
	}: {
		categoryId: number;
		score: number;
		userId: number;
	}): Promise<UserScore> {
		const item = await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.insertAndFetch({
				categoryId,
				score,
				userId,
			});

		return {
			categoryId: item.categoryId,
			createdAt: item.createdAt,
			score: item.score,
			updatedAt: item.updatedAt,
			userId: item.userId,
		};
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async deleteUserScores(userId: number): Promise<number> {
		return await this.categoryModel
			.query()
			.from(DatabaseTableName.QUIZ_SCORES)
			.where("userId", userId)
			.delete();
	}

	public find(): Promise<null> {
		return Promise.resolve(null);
	}

	public findAll(): Promise<null[]> {
		return Promise.resolve([null]);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { CategoryRepository };
