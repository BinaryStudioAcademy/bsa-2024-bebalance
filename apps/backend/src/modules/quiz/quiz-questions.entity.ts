import { type Entity } from "~/libs/types/types.js";

import { QuizAnswersModel } from "./quiz-answers.model.js";

class QuizQuestionsEntity implements Entity {
	private answers: null | QuizAnswersModel;

	private categoryId: number;

	private createdAt: string;

	private id: null | number;

	private label: string;

	private updatedAt: string;

	private constructor({
		answers,
		categoryId,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		answers: null | QuizAnswersModel;
		categoryId: number;
		createdAt: string;
		id: null | number;
		label: string;
		updatedAt: string;
	}) {
		this.answers = answers;
		this.categoryId = categoryId;
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		answers,
		categoryId,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		answers: null | QuizAnswersModel;
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	}): QuizQuestionsEntity {
		return new QuizQuestionsEntity({
			answers,
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
			answers: null,
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
		answers: null | QuizAnswersModel;
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	} {
		return {
			answers: this.answers,
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			updatedAt: this.updatedAt,
		};
	}
}

export { QuizQuestionsEntity };
