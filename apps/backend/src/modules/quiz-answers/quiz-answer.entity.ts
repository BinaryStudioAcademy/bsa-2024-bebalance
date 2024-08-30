import { type Entity } from "~/libs/types/types.js";

import { type QuizUserAnswerDto } from "./libs/types/types.js";

class QuizAnswerEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private userAnswers: QuizUserAnswerDto[];

	private value: number;

	private constructor({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userAnswers,
		value,
	}: {
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizUserAnswerDto[];
		value: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
		this.userAnswers = userAnswers;
		this.value = value;
	}

	public static initialize({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userAnswers,
		value,
	}: {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizUserAnswerDto[];
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
			userAnswers,
			value,
		});
	}

	public static initializeNew({
		label,
		questionId,
		userAnswers,
		value,
	}: {
		label: string;
		questionId: number;
		userAnswers: QuizUserAnswerDto[];
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			createdAt: "",
			id: null,
			label,
			questionId,
			updatedAt: "",
			userAnswers,
			value,
		});
	}

	public toNewObject(): {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizUserAnswerDto[];
		value: number;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			userAnswers: this.userAnswers,
			value: this.value,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizUserAnswerDto[];
		value: number;
	} {
		return this.toNewObject();
	}
}

export { QuizAnswerEntity };
