import { type Entity } from "~/libs/types/types.js";

class CategoryEntity implements Entity {
	private categoryId: null | number;

	private createdAt: string;

	private id: null | number;

	private name: string;

	private score: null | number;

	private scores: CategoryEntity[];

	private updatedAt: string;

	private userId: null | number;

	private constructor({
		categoryId,
		createdAt,
		id,
		name,
		score,
		scores,
		updatedAt,
		userId,
	}: {
		categoryId: null | number;
		createdAt: string;
		id: null | number;
		name: string;
		score: null | number;
		scores: CategoryEntity[];
		updatedAt: string;
		userId: null | number;
	}) {
		this.categoryId = categoryId;
		this.createdAt = createdAt;
		this.id = id;
		this.name = name;
		this.score = score;
		this.scores = scores;
		this.updatedAt = updatedAt;
		this.userId = userId;
	}

	public static initialize({
		categoryId,
		createdAt,
		id,
		name,
		score,
		scores,
		updatedAt,
		userId,
	}: {
		categoryId?: number;
		createdAt: string;
		id: null | number;
		name: string;
		score?: number;
		scores: CategoryEntity[];
		updatedAt: string;
		userId?: number;
	}): CategoryEntity {
		return new CategoryEntity({
			categoryId: categoryId ?? null,
			createdAt,
			id,
			name,
			score: score ?? null,
			scores,
			updatedAt,
			userId: userId ?? null,
		});
	}

	public static initializeNew({ name }: { name: string }): CategoryEntity {
		return new CategoryEntity({
			categoryId: null,
			createdAt: "",
			id: null,
			name,
			score: null,
			scores: [],
			updatedAt: "",
			userId: null,
		});
	}

	public toNewObject(): {
		categoryId: number;
		createdAt: string;
		id: number;
		name: string;
		score: number;
		scores: CategoryEntity[];
		updatedAt: string;
		userId: number;
	} {
		return {
			categoryId: this.categoryId as number,
			createdAt: this.createdAt,
			id: this.id as number,
			name: this.name,
			score: this.score as number,
			scores: this.scores,
			updatedAt: this.updatedAt,
			userId: this.userId as number,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		name: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}

	public toObjectWithScores(): {
		categoryId: number;
		createdAt: string;
		id: number;
		name: string;
		score: number;
		scores: CategoryEntity[];
		updatedAt: string;
		userId: number;
	} {
		return this.toNewObject();
	}
}

export { CategoryEntity };
