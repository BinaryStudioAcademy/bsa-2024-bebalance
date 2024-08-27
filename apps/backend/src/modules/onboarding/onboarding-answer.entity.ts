import { type Entity } from "~/libs/types/types.js";

class OnboardingAnswerEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private label: string;

	private questionId: number;

	private updatedAt: string;

	private constructor({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		label: string;
		questionId: number;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.questionId = questionId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		label,
		questionId,
		updatedAt,
	}: {
		createdAt: string;
		id: number;
		label: string;
		questionId: number;
		updatedAt: string;
	}): OnboardingAnswerEntity {
		return new OnboardingAnswerEntity({
			createdAt,
			id,
			label,
			questionId,
			updatedAt,
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
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			questionId: this.questionId,
			updatedAt: this.updatedAt,
		};
	}
}

export { OnboardingAnswerEntity };
