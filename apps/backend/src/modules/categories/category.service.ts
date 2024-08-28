import { type Service } from "~/libs/types/types.js";

import { type CategoryRepository } from "./category.repository.js";
import { type UserScore } from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
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
		const item = await this.categoryRepository.createScore({
			categoryId,
			score,
			userId,
		});

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public deleteUserScores(userId: number): Promise<number> {
		return this.categoryRepository.deleteUserScores(userId);
	}

	public find(): Promise<null> {
		return Promise.resolve(null);
	}

	public findAll(): Promise<{ items: null[] }> {
		return Promise.resolve({ items: [null] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { CategoryService };
