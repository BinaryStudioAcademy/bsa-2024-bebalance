import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { OnboardingAnswerEntity } from "./onboarding/onboarding-answer.entuty.js";
import { OnboardingAnswerModel } from "./onboarding/onboarding-answer.model.js";
import { OnboardingQuestionEntity } from "./onboarding/onboarding-question.entity.js";
import { OnboardingQuestionModel } from "./onboarding/onboarding-question.model.js";

class SurveyRepository implements Repository {
	private onboardingAnswerModel: typeof OnboardingAnswerModel;
	private onboardingQuestionModel: typeof OnboardingQuestionModel;

	public constructor(
		onboardingAnswerModel: typeof OnboardingAnswerModel,
		onboardingQuestionModel: typeof OnboardingQuestionModel,
	) {
		this.onboardingAnswerModel = onboardingAnswerModel;
		this.onboardingQuestionModel = onboardingQuestionModel;
	}

	public create(): ReturnType<Repository["create"]> {
		return Promise.resolve(null);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve([]);
	}

	public async getOnboardingSurvey(): Promise<OnboardingQuestionEntity[]> {
		const onboardingQuestions = await this.onboardingQuestionModel
			.query()
			.withGraphFetched(RelationName.ONBOARDING_ANSWERS);

		return onboardingQuestions.map((onboardingQuestion) =>
			OnboardingQuestionEntity.initialize({
				answers: onboardingQuestion.answers.map((onboardingAnswer) => {
					return OnboardingAnswerEntity.initialize({
						createdAt: onboardingAnswer.createdAt,
						id: onboardingAnswer.id,
						label: onboardingAnswer.label,
						questionId: onboardingAnswer.questionId,
						updatedAt: onboardingAnswer.updatedAt,
					});
				}),
				createdAt: onboardingQuestion.createdAt,
				id: onboardingQuestion.id,
				label: onboardingQuestion.label,
				updatedAt: onboardingQuestion.updatedAt,
			}),
		);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { SurveyRepository };
