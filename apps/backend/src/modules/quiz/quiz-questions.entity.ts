import { type QuizAnswersDto } from "./libs/types/types.js";

class QuizQuestionsEntity {
	private answers: QuizAnswersDto[];

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
		answers: QuizAnswersDto[];
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
		answers: QuizAnswersDto[];
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

	public toObject(): {
		answers: QuizAnswersDto[];
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
