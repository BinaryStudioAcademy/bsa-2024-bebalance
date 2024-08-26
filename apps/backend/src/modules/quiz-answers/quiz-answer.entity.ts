import { type Entity } from "~/libs/types/types.js";

class QuizAnswerEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private value: number;

	private constructor({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		value,
	}: {
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
		value: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
		this.value = value;
	}

	public static initialize({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		value,
	}: {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
			value,
		});
	}

	public static initializeNew({
		label,
		questionId,
		value,
	}: {
		label: string;
		questionId: number;
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			createdAt: "",
			id: null,
			label,
			questionId,
			updatedAt: "",
			value,
		});
	}

	public toNewObject(): {
		createdAt: string;
		label: string;
		questionId: number;
		updatedAt: string;
		value: number;
	} {
		return {
			createdAt: this.createdAt,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			value: this.value,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		value: number;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			value: this.value,
		};
	}
}

export { QuizAnswerEntity };
