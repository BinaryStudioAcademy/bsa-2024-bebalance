import { type Entity } from "~/libs/types/types.js";

class OnboardingAnswerEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private userId: null | number;

	private constructor({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: null | number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
		this.userId = userId;
	}

	public static initialize({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
	}): OnboardingAnswerEntity {
		return new OnboardingAnswerEntity({
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		label,
		questionId,
	}: {
		label: string;
		questionId: number;
	}): OnboardingAnswerEntity {
		return new OnboardingAnswerEntity({
			createdAt: "",
			id: null,
			label,
			questionId,
			updatedAt: "",
			userId: null,
		});
	}

	public toNewObject(): {
		createdAt: string;
		label: string;
		questionId: number;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
		};
	}
	public toObject(): {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
			userId: this.userId as number,
		};
	}
}

export { OnboardingAnswerEntity };
