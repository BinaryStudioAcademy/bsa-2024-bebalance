import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import {
	type CategorizedQuizAnswerModel,
	type QuizAnswerDto,
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
		const answer = await this.quizAnswerModel
			.query()
			.insert({ label, questionId, value })
			.returning("*");

		return QuizAnswerEntity.initialize({
			answerId: answer.answerId,
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userId: answer.userId,
			value: answer.value,
		});
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<QuizAnswerEntity[]> {
		const answers = await Promise.all(
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

		return answers.map((answer) =>
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
			.where({ userId })
			.delete();
	}

	public async find(id: number): Promise<null | QuizAnswerEntity> {
		const answer = await this.quizAnswerModel.query().findById(id);

		return answer
			? QuizAnswerEntity.initialize({
					answerId: answer.answerId,
					createdAt: answer.createdAt,
					id: answer.id,
					label: answer.label,
					questionId: answer.questionId,
					updatedAt: answer.updatedAt,
					userId: answer.userId,
					value: answer.value,
				})
			: null;
	}

	public async findAll(): Promise<QuizAnswerEntity[]> {
		const answers = await this.quizAnswerModel.query().select("*");

		return answers.map((answer) =>
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

	public async findByIds(ids: number[]): Promise<QuizAnswerEntity[]> {
		const answers = await this.quizAnswerModel.query().findByIds(ids);

		return answers.map((answer) =>
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

	public async getCategorizedAnswer(id: number): Promise<{
		answerId: number;
		categoryId: number;
		value: number;
	}> {
		const answer = await this.quizAnswerModel
			.query()
			.findById(id)
			.withGraphFetched({
				question: {
					category: true,
				},
			})
			.castTo<CategorizedQuizAnswerModel>();

		return {
			answerId: answer.id,
			categoryId: answer.question.category.id,
			value: answer.value,
		};
	}

	public async update(
		id: number,
		payload: Partial<QuizAnswerDto>,
	): Promise<QuizAnswerEntity> {
		const answer = await this.quizAnswerModel
			.query()
			.patchAndFetchById(id, { ...payload });

		return QuizAnswerEntity.initialize({
			answerId: answer.answerId,
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userId: answer.userId,
			value: answer.value,
		});
	}
}

export { QuizAnswerRepository };
