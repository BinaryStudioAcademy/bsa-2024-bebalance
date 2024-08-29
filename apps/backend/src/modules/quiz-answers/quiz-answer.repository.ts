import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import {
	type CategorizedQuizAnswerModel,
	type QuizAnswer,
} from "./libs/types/types.js";
import { QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerModel } from "./quiz-answer.model.js";

class QuizAnswerRepository implements Repository {
	private quizAnswerModel: typeof QuizAnswerModel;

	public constructor(quizAnswerModel: typeof QuizAnswerModel) {
		this.quizAnswerModel = quizAnswerModel;
	}

	public async create(entity: QuizAnswerEntity): Promise<QuizAnswerEntity> {
		const { label, questionId, value } = entity.toNewObject();
		const item = await this.quizAnswerModel
			.query()
			.insert({ label, questionId, value })
			.returning("*");

		return QuizAnswerEntity.initialize({
			answerId: item.answerId,
			createdAt: item.createdAt,
			id: item.id,
			label: item.label,
			questionId: item.questionId,
			updatedAt: item.updatedAt,
			userId: item.userId,
			value: item.value,
		});
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<QuizAnswerEntity[]> {
		const items = await Promise.all(
			answerIds.map((answerId) => {
				return this.quizAnswerModel
					.query()
					.from(DatabaseTableName.QUIZ_ANSWERS_TO_USERS)
					.insertAndFetch({
						answerId,
						userId,
					});
			}),
		);

		return items.map((answer) =>
			QuizAnswerEntity.initialize({
				answerId: answer.answerId,
				createdAt: answer.createdAt,
				id: answer.id,
				label: answer.label,
				questionId: answer.questionId,
				updatedAt: answer.updatedAt,
				userId: answer.userId,
				value: answer.value,
			}),
		);
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.quizAnswerModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async deleteUserAnswers(userId: number): Promise<number> {
		return await this.quizAnswerModel
			.query()
			.from(DatabaseTableName.QUIZ_ANSWERS_TO_USERS)
			.where("userId", userId)
			.delete();
	}

	public async find(id: number): Promise<null | QuizAnswerEntity> {
		const item = await this.quizAnswerModel.query().findById(id);

		return item
			? QuizAnswerEntity.initialize({
					answerId: item.answerId,
					createdAt: item.createdAt,
					id: item.id,
					label: item.label,
					questionId: item.questionId,
					updatedAt: item.updatedAt,
					userId: item.userId,
					value: item.value,
				})
			: null;
	}

	public async findAll(): Promise<QuizAnswerEntity[]> {
		const items = await this.quizAnswerModel.query().select("*");

		return items.map((item) =>
			QuizAnswerEntity.initialize({
				answerId: item.answerId,
				createdAt: item.createdAt,
				id: item.id,
				label: item.label,
				questionId: item.questionId,
				updatedAt: item.updatedAt,
				userId: item.userId,
				value: item.value,
			}),
		);
	}

	public async findByIds(ids: number[]): Promise<QuizAnswerEntity[]> {
		const items = await this.quizAnswerModel.query().findByIds(ids);

		return items.map((item) =>
			QuizAnswerEntity.initialize({
				answerId: item.answerId,
				createdAt: item.createdAt,
				id: item.id,
				label: item.label,
				questionId: item.questionId,
				updatedAt: item.updatedAt,
				userId: item.userId,
				value: item.value,
			}),
		);
	}

	public async getCategorizedAnswer(id: number): Promise<{
		answerId: number;
		categoryId: number;
		value: number;
	}> {
		const item = (await this.quizAnswerModel
			.query()
			.findById(id)
			.withGraphFetched({
				question: {
					category: true,
				},
			})) as CategorizedQuizAnswerModel;

		return {
			answerId: item.id,
			categoryId: item.question.category.id,
			value: item.value,
		};
	}

	public async update(
		id: number,
		payload: Partial<QuizAnswer>,
	): Promise<QuizAnswerEntity> {
		const item = await this.quizAnswerModel
			.query()
			.patchAndFetchById(id, { ...payload });

		return QuizAnswerEntity.initialize({
			answerId: item.answerId,
			createdAt: item.createdAt,
			id: item.id,
			label: item.label,
			questionId: item.questionId,
			updatedAt: item.updatedAt,
			userId: item.userId,
			value: item.value,
		});
	}
}

export { QuizAnswerRepository };
