import { type Entity } from "~/libs/types/types.js";

import { type QuizScoreDto } from "./libs/types/types.js";

class CategoryEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private name: string;

	private scores: QuizScoreDto[];

	private updatedAt: string;

	private constructor({
		createdAt,
		id,
		name,
		scores,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		name: string;
		scores: QuizScoreDto[];
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.name = name;
		this.scores = scores;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		name,
		scores,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		name: string;
		scores: QuizScoreDto[];
		updatedAt: string;
	}): CategoryEntity {
		return new CategoryEntity({
			createdAt,
			id,
			name,
			scores,
			updatedAt,
		});
	}

	public static initializeNew({ name }: { name: string }): CategoryEntity {
		return new CategoryEntity({
			createdAt: "",
			id: null,
			name,
			scores: [],
			updatedAt: "",
		});
	}

	public toNewObject(): {
		createdAt: string;
		id: number;
		name: string;
		scores: QuizScoreDto[];
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			name: this.name,
			scores: this.scores,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		name: string;
		scores: QuizScoreDto[];
		updatedAt: string;
	} {
		return this.toNewObject();
	}
}

export { CategoryEntity };
