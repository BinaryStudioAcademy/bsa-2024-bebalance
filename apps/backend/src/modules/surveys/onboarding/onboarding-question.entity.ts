import { type Entity } from "~/libs/types/types.js";

import { type SurveyAnswerDto } from "../libs/types/types.js";
import { type OnboardingAnswerEntity } from "./onboarding-answer.entuty.js";

class OnboardingQuestionEntity implements Entity {
	private answers: OnboardingAnswerEntity[];

	private createdAt: string;

	private id: null | number;

	private label: string;

	private updatedAt: string;

	private constructor({
		answers,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		answers: OnboardingAnswerEntity[];
		createdAt: string;
		id: null | number;
		label: string;
		updatedAt: string;
	}) {
		this.answers = answers;
		this.createdAt = createdAt;
		this.id = id;
		this.label = label;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		answers,
		createdAt,
		id,
		label,
		updatedAt,
	}: {
		answers: OnboardingAnswerEntity[];
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	}): OnboardingQuestionEntity {
		return new OnboardingQuestionEntity({
			answers,
			createdAt,
			id,
			label,
			updatedAt,
		});
	}

	public static initializeNew({
		label,
	}: {
		label: string;
	}): OnboardingQuestionEntity {
		return new OnboardingQuestionEntity({
			answers: [],
			createdAt: "",
			id: null,
			label,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		label: string;
	} {
		return {
			label: this.label,
		};
	}

	public toObject(): {
		answers: SurveyAnswerDto[];
		createdAt: string;
		id: number;
		label: string;
		updatedAt: string;
	} {
		return {
			answers: this.answers.map((answer) => {
				return answer.toObject();
			}),
			createdAt: this.createdAt,
			id: this.id as number,
			label: this.label,
			updatedAt: this.updatedAt,
		};
	}
}

export { OnboardingQuestionEntity };
