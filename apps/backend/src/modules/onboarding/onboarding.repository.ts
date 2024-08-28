import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { OnboardingAnswerEntity } from "./onboarding-answer.entuty.js";
import { type OnboardingAnswerModel } from "./onboarding-answer.model.js";
import { OnboardingQuestionEntity } from "./onboarding-question.entity.js";
import { type OnboardingQuestionModel } from "./onboarding-question.model.js";

class OnboardingRepository implements Repository {
	private onboardingAnswerModel: typeof OnboardingAnswerModel;
	private onboardingQuestionModel: typeof OnboardingQuestionModel;

	public constructor(
		onboardingAnswerModel: typeof OnboardingAnswerModel,
		onboardingQuestionModel: typeof OnboardingQuestionModel,
	) {
		this.onboardingAnswerModel = onboardingAnswerModel;
		this.onboardingQuestionModel = onboardingQuestionModel;
	}

	public async create(
		entity: OnboardingQuestionEntity,
	): Promise<OnboardingQuestionEntity> {
		const { answers, label } = entity.toNewObject();

		const onboardingQuestion = await this.onboardingQuestionModel
			.query()
			.insertGraph({
				answers,
				label,
			})
			.returning("*");

		return OnboardingQuestionEntity.initialize({
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
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedOnboardingQuestion = await this.onboardingQuestionModel
			.query()
			.delete()
			.where({ id })
			.withGraphFetched(RelationName.ONBOARDING_ANSWERS);

		return Boolean(deletedOnboardingQuestion);
	}

	public async find(id: number): Promise<null | OnboardingQuestionEntity> {
		const onboardingQuestion = await this.onboardingQuestionModel
			.query()
			.findById(id)
			.withGraphJoined(RelationName.ONBOARDING_ANSWERS);

		return onboardingQuestion
			? OnboardingQuestionEntity.initialize({
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
				})
			: null;
	}

	public async findAll(): Promise<OnboardingQuestionEntity[]> {
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

	public async update(
		id: number,
		entity: OnboardingQuestionEntity,
	): Promise<OnboardingQuestionEntity> {
		const { answers, label } = entity.toNewObject();

		const updatedOnboardingQuestion = await this.onboardingQuestionModel
			.query()
			.upsertGraphAndFetch(
				{
					answers: answers.map((answer) => ({
						label: answer.label,
						questionId: id,
					})),
					id,
					label,
				},
				{ relate: true, unrelate: true },
			)
			.withGraphFetched(RelationName.ONBOARDING_ANSWERS);

		return OnboardingQuestionEntity.initialize({
			answers: updatedOnboardingQuestion.answers.map((onboardingAnswer) => {
				return OnboardingAnswerEntity.initialize({
					createdAt: onboardingAnswer.createdAt,
					id: onboardingAnswer.id,
					label: onboardingAnswer.label,
					questionId: onboardingAnswer.questionId,
					updatedAt: onboardingAnswer.updatedAt,
				});
			}),
			createdAt: updatedOnboardingQuestion.createdAt,
			id: updatedOnboardingQuestion.id,
			label: updatedOnboardingQuestion.label,
			updatedAt: updatedOnboardingQuestion.updatedAt,
		});
	}
}

export { OnboardingRepository };
