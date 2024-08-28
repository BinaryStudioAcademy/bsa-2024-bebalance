import { type Entity } from "~/libs/types/types.js";

class QuizAnswerEntity implements Entity {
	private answerId: number;

	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private userId: number;

	private value: number;

	private constructor({
		answerId,
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userId,
		value,
	}: {
		answerId: number;
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
		value: number;
	}) {
		this.answerId = answerId;
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
		this.userId = userId;
		this.value = value;
	}

	public static initialize({
		answerId,
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userId,
		value,
	}: {
		answerId: number;
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			answerId,
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
			userId,
			value,
		});
	}

	public static initializeNew({
		answerId,
		label,
		questionId,
		userId,
		value,
	}: {
		answerId: number;
		label: string;
		questionId: number;
		userId: number;
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			answerId,
			createdAt: "",
			id: null,
			label,
			questionId,
			updatedAt: "",
			userId,
			value,
		});
	}

	public toNewObject(): {
		answerId: number;
		createdAt: string;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
		value: number;
	} {
		return {
			answerId: this.answerId,
			createdAt: this.createdAt,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			userId: this.userId,
			value: this.value,
		};
	}

	public toObject(): {
		answerId: number;
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
		value: number;
	} {
		return {
			answerId: this.answerId,
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			userId: this.userId,
			value: this.value,
		};
	}
}

export { QuizAnswerEntity };
