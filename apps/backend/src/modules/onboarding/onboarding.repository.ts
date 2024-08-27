import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { OnboardingAnswerEntity } from "./onboarding-answer.entity.js";
import { type OnboardingAnswerModel } from "./onboarding-answer.model.js";

class OnboardingRepository implements Repository {
	private onboardingAnswerModel: typeof OnboardingAnswerModel;

	public constructor(onboardingAnswerModel: typeof OnboardingAnswerModel) {
		this.onboardingAnswerModel = onboardingAnswerModel;
	}

	public create(): ReturnType<Repository["create"]> {
		return Promise.resolve(null);
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<number> {
		const userAnswers = await Promise.all(
			answerIds.map((answerId) =>
				this.onboardingAnswerModel
					.relatedQuery(RelationName.USERS)
					.for(answerId)
					.relate(userId),
			),
		);

		return userAnswers.length;
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | OnboardingAnswerEntity> {
		const result = await this.onboardingAnswerModel.query().findById(id);

		if (!result) {
			return null;
		}

		return OnboardingAnswerEntity.initialize({
			createdAt: result.createdAt,
			id: result.id,
			label: result.label,
			questionId: result.questionId,
			updatedAt: result.updatedAt,
		});
	}

	public async findAll(): Promise<OnboardingAnswerEntity[]> {
		const results = await this.onboardingAnswerModel.query();

		return results.map((result) =>
			OnboardingAnswerEntity.initialize({
				createdAt: result.createdAt,
				id: result.id,
				label: result.label,
				questionId: result.questionId,
				updatedAt: result.updatedAt,
			}),
		);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { OnboardingRepository };
