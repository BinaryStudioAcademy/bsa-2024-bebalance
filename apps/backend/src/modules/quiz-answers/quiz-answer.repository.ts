import { RelationName } from "~/libs/enums/relation-name.enum.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import {
	type CategorizedQuizAnswerModel,
	type QuizAnswerDto,
	type QuizUserAnswerDto,
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
			.withGraphFetched(RelationName.QUESTION)
			.returning("*");

		return QuizAnswerEntity.initialize({
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userAnswers: answer.userAnswers,
			value: answer.value,
		});
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<QuizUserAnswerDto[]> {
		await Promise.all(
			answerIds.map(async (answerId) => {
				const answer = await this.quizAnswerModel
					.query()
					.findById(answerId)
					.castTo<QuizAnswerModel>();

				await answer.$relatedQuery(RelationName.USERS).relate(userId);
			}),
		);

		return await this.quizAnswerModel
			.query()
			.from(DatabaseTableName.QUIZ_ANSWERS_TO_USERS)
			.where({ userId })
			.castTo<QuizUserAnswerDto[]>();
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
		const answer = await this.quizAnswerModel
			.query()
			.findById(id)
			.withGraphJoined(RelationName.QUESTION);

		return answer
			? QuizAnswerEntity.initialize({
					createdAt: answer.createdAt,
					id: answer.id,
					label: answer.label,
					questionId: answer.questionId,
					updatedAt: answer.updatedAt,
					userAnswers: answer.userAnswers,
					value: answer.value,
				})
			: null;
	}

	public async findAll(): Promise<QuizAnswerEntity[]> {
		const answers = await this.quizAnswerModel.query().select("*");

		return answers.map((answer) => {
			return QuizAnswerEntity.initialize({
				createdAt: answer.createdAt,
				id: answer.id,
				label: answer.label,
				questionId: answer.questionId,
				updatedAt: answer.updatedAt,
				userAnswers: answer.userAnswers,
				value: answer.value,
			});
		});
	}

	public async findByIds(ids: number[]): Promise<QuizAnswerEntity[]> {
		const answers = await this.quizAnswerModel.query().findByIds(ids);

		return answers.map((answer) => {
			return QuizAnswerEntity.initialize({
				createdAt: answer.createdAt,
				id: answer.id,
				label: answer.label,
				questionId: answer.questionId,
				updatedAt: answer.updatedAt,
				userAnswers: answer.userAnswers,
				value: answer.value,
			});
		});
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
			.patchAndFetchById(id, { ...payload })
			.withGraphJoined(RelationName.QUESTION);

		return QuizAnswerEntity.initialize({
			createdAt: answer.createdAt,
			id: answer.id,
			label: answer.label,
			questionId: answer.questionId,
			updatedAt: answer.updatedAt,
			userAnswers: answer.userAnswers,
			value: answer.value,
		});
	}
}

export { QuizAnswerRepository };
