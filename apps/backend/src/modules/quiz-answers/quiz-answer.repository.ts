import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import {
	type CategoriezedQuizAnswerModel,
	type UserAnswer,
} from "./libs/types/types.js";
import { QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerModel } from "./quiz-answer.model.js";

class QuizAnswerRepository implements Repository {
	private quizAnswerModel: typeof QuizAnswerModel;

	public constructor(quizAnswerModel: typeof QuizAnswerModel) {
		this.quizAnswerModel = quizAnswerModel;
	}

	public create(): Promise<null> {
		return Promise.resolve(null);
	}

	public async createUserAnswers(
		userId: number,
		answerIds: number[],
	): Promise<UserAnswer[]> {
		const answers = await Promise.all(
			answerIds.map((answerId) =>
				this.quizAnswerModel
					.query()
					.from(DatabaseTableName.QUIZ_ANSWERS_TO_USERS)
					.insertAndFetch({
						answerId,
						userId,
					}),
			),
		);

		return answers.map((answer) => ({
			answerId: answer.answerId,
			createdAt: answer.createdAt,
			id: answer.id,
			updatedAt: answer.updatedAt,
			userId: answer.userId,
		}));
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
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

	public async getCategoriezedAnswer(id: number): Promise<{
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
			})) as CategoriezedQuizAnswerModel;

		return {
			answerId: item.id,
			categoryId: item.question.category.id,
			value: item.value,
		};
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { QuizAnswerRepository };
