import { RelationName } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { type OnboardingAnswerDto } from "./libs/types/types.js";
import { OnboardingAnswerEntity } from "./onboarding-answer.entity.js";
import { type OnboardingAnswerModel } from "./onboarding-answer.model.js";

class OnboardingRepository implements Repository {
	private onboardingAnswerModel: typeof OnboardingAnswerModel;

	public constructor(onboardingAnswerModel: typeof OnboardingAnswerModel) {
		this.onboardingAnswerModel = onboardingAnswerModel;
	}

	public async create(
		entity: OnboardingAnswerEntity,
	): Promise<OnboardingAnswerEntity> {
		const { label, questionId } = entity.toNewObject();
		const answer = await this.onboardingAnswerModel
			.query()
			.insert({ label, questionId })
			.returning("*");

		return OnboardingAnswerEntity.initialize({
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userId: answer.userId,
		});
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<OnboardingAnswerEntity[]> {
		await Promise.all(
			answerIds.map((answerId) =>
				this.onboardingAnswerModel
					.relatedQuery(RelationName.USERS)
					.for(answerId)
					.relate(userId),
			),
		);

		const savedAnswers = await this.onboardingAnswerModel
			.query()
			.whereIn("id", answerIds);

		return savedAnswers.map((answer) =>
			OnboardingAnswerEntity.initialize({
				createdAt: answer.createdAt,
				id: answer.id,
				label: answer.label,
				questionId: answer.questionId,
				updatedAt: answer.updatedAt,
				userId: answer.userId,
			}),
		);
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.onboardingAnswerModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async deleteUserAnswers(userId: number): Promise<number> {
		return await this.onboardingAnswerModel
			.query()
			.from(DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS)
			.where({ userId })
			.delete();
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
			userId: result.userId,
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
				userId: result.userId,
			}),
		);
	}

	public async findAnswersByIds(
		ids: number[],
	): Promise<OnboardingAnswerEntity[]> {
		const results = await this.onboardingAnswerModel.query().whereIn("id", ids);

		return results.map((result) =>
			OnboardingAnswerEntity.initialize({
				createdAt: result.createdAt,
				id: result.id,
				label: result.label,
				questionId: result.questionId,
				updatedAt: result.updatedAt,
				userId: result.userId,
			}),
		);
	}

	public async update(
		id: number,
		payload: Partial<OnboardingAnswerDto>,
	): Promise<OnboardingAnswerEntity> {
		const answer = await this.onboardingAnswerModel
			.query()
			.patchAndFetchById(id, { ...payload });

		return OnboardingAnswerEntity.initialize({
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userId: answer.userId,
		});
	}
}

export { OnboardingRepository };
