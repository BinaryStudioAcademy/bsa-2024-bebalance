import { type Entity } from "~/libs/types/types.js";

class QuizQuestionsEntity implements Entity {
	private categoryId: number;

	private createdAt: string;

	private id: null | number;

	private label: string;

	private updatedAt: string;

	private constructor({
		categoryId,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		categoryId: number;
		createdAt: string;
		id: null | number;
		label: string;
		updatedAt: string;
	}) {
		this.categoryId = categoryId;
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		categoryId,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	}): QuizQuestionsEntity {
		return new QuizQuestionsEntity({
			categoryId,
			createdAt,
			id,
			label,
			updatedAt,
		});
	}

	public static initializeNew({
		categoryId,
		label,
	}: {
		categoryId: number;
		label: string;
	}): QuizQuestionsEntity {
		return new QuizQuestionsEntity({
			categoryId,
			createdAt: "",
			id: null,
			label,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		categoryId: number;
		createdAt: string;
		label: string;
		updatedAt: string;
	} {
		return {
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			label: this.label,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	} {
		return {
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			updatedAt: this.updatedAt,
		};
	}
}

export { QuizQuestionsEntity };
