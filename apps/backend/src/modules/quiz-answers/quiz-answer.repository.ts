import { RelationName } from "~/libs/enums/relation-name.enum.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { QuizAnswerEntity } from "./quiz-answer.entity.js";
import { QuizAnswerModel } from "./quiz-answer.model.js";

class QuizAnswerRepository implements Repository {
	private quizAnswerModel: typeof QuizAnswerModel;

	public constructor(quizAnswerModel: typeof QuizAnswerModel) {
		this.quizAnswerModel = quizAnswerModel;
	}

	public create(): Promise<null> {
		return Promise.resolve(null);
	}

	public async createUserAnswer(
		userId: number,
		answerId: number,
	): Promise<{ relationId: number }> {
		const relationId = await this.quizAnswerModel
			.relatedQuery(RelationName.USERS)
			.for(answerId)
			.relate(userId);

		return { relationId };
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async deleteUserAnswer(
		userId: number,
		answerId: number,
	): Promise<boolean> {
		await this.quizAnswerModel
			.relatedQuery(RelationName.USERS)
			.for(answerId)
			.unrelate()
			.where(`${DatabaseTableName.USERS}.id`, userId);

		return true;
	}

	public async find(id: number): Promise<null | QuizAnswerEntity> {
		const item = await this.quizAnswerModel.query().findById(id);

		return item
			? QuizAnswerEntity.initialize({
					createdAt: item.createdAt,
					id: item.id,
					label: item.label,
					questionId: item.questionId,
					updatedAt: item.updatedAt,
					value: item.value,
				})
			: null;
	}

	public findAll(): Promise<null[]> {
		return Promise.resolve([null]);
	}

	public async findUserAnswerByQuestion(
		questionId: number,
		userId: number,
	): Promise<null | QuizAnswerEntity> {
		const item = await this.quizAnswerModel
			.query()
			.where({ questionId })
			.whereExists(
				this.quizAnswerModel
					.relatedQuery(RelationName.USERS)
					.where(`${DatabaseTableName.USERS}.id`, userId)
					.andWhere(
						`${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.answerId`,
						this.quizAnswerModel.ref("id"),
					),
			)
			.first();

		return item
			? QuizAnswerEntity.initialize({
					createdAt: item.createdAt,
					id: item.id,
					label: item.label,
					questionId: item.questionId,
					updatedAt: item.updatedAt,
					value: item.value,
				})
			: null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { QuizAnswerRepository };
