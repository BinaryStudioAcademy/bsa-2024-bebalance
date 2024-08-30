import { type Entity } from "~/libs/types/types.js";
import { type QuizAnswerDto } from "~/modules/quiz-answers/quiz-answers.js";

class QuizQuestionEntity implements Entity {
	private answers: QuizAnswerDto[];

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
		answers: QuizAnswerDto[];
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
		answers: QuizAnswerDto[];
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	}): QuizQuestionEntity {
		return new QuizQuestionEntity({
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
	}): QuizQuestionEntity {
		return new QuizQuestionEntity({
			answers: [],
			categoryId,
			createdAt: "",
			id: null,
			label,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		answers: QuizAnswerDto[];
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

	public toObject(): {
		answers: QuizAnswerDto[];
		categoryId: number;
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	} {
		return this.toNewObject();
	}
}

export { QuizQuestionEntity };
