import { RelationName } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import {
	DEFAULT_COUNT_VALUE,
	FIRST_ELEMENT_INDEX,
} from "./libs/constants/constants.js";
import {
	type CountResult,
	type OnboardingAnswerDto,
} from "./libs/types/types.js";
import { OnboardingAnswerEntity } from "./onboarding-answer.entity.js";
import { type OnboardingAnswerModel } from "./onboarding-answer.model.js";
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

	public async countQuestions(): Promise<number> {
		const result = await this.onboardingQuestionModel
			.query()
			.count("* as count");

		const countResult: CountResult[] = result as CountResult[];

		const countString =
			countResult[FIRST_ELEMENT_INDEX]?.count ?? DEFAULT_COUNT_VALUE.toString();

		return Number.parseInt(countString, 10);
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
			answerIds.map((answerId) => {
				return this.onboardingAnswerModel
					.relatedQuery(RelationName.USERS)
					.for(answerId)
					.relate(userId);
			}),
		);

		const savedAnswers = await this.onboardingAnswerModel
			.query()
			.whereIn("id", answerIds);

		return savedAnswers.map((answer) => {
			return OnboardingAnswerEntity.initialize({
				createdAt: answer.createdAt,
				id: answer.id,
				label: answer.label,
				questionId: answer.questionId,
				updatedAt: answer.updatedAt,
				userId: answer.userId,
			});
		});
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

		return results.map((result) => {
			return OnboardingAnswerEntity.initialize({
				createdAt: result.createdAt,
				id: result.id,
				label: result.label,
				questionId: result.questionId,
				updatedAt: result.updatedAt,
				userId: result.userId,
			});
		});
	}

	public async findAnswersByIds(
		ids: number[],
	): Promise<OnboardingAnswerEntity[]> {
		const results = await this.onboardingAnswerModel.query().whereIn("id", ids);

		return results.map((result) => {
			return OnboardingAnswerEntity.initialize({
				createdAt: result.createdAt,
				id: result.id,
				label: result.label,
				questionId: result.questionId,
				updatedAt: result.updatedAt,
				userId: result.userId,
			});
		});
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
