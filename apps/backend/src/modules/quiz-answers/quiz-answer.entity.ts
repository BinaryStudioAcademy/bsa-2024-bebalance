import { type Entity } from "~/libs/types/types.js";

class QuizAnswerEntity implements Entity {
	private answerId: null | number;

	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private userAnswers: QuizAnswerEntity[];

	private userId: null | number;

	private value: number;

	private constructor({
		answerId,
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userAnswers,
		userId,
		value,
	}: {
		answerId: null | number;
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizAnswerEntity[];
		userId: null | number;
		value: number;
	}) {
		this.answerId = answerId;
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
		this.userAnswers = userAnswers;
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
		userAnswers,
		userId,
		value,
	}: {
		answerId?: number;
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizAnswerEntity[];
		userId?: number;
		value: number;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			answerId: answerId ?? null,
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
			userAnswers,
			userId: userId ?? null,
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
			answerId: null,
			createdAt: "",
			id: null,
			label,
			questionId,
			updatedAt: "",
			userAnswers: [],
			userId: null,
			value,
		});
	}

	public toNewObject(): {
		answerId: number;
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userAnswers: QuizAnswerEntity[];
		userId: number;
		value: number;
	} {
		return {
			answerId: this.answerId as number,
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			userAnswers: this.userAnswers,
			userId: this.userId as number,
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
		userAnswers: QuizAnswerEntity[];
		userId: number;
		value: number;
	} {
		return this.toNewObject();
	}
}

export { QuizAnswerEntity };
