import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/repository.type.js";

import { QuizQuestionsEntity } from "./quiz-questions.entity.js";
import { type QuizQuestionsModel } from "./quiz-questions.model.js";

class QuizQuestionsRepository implements Repository {
	private quizQuestionsModel: typeof QuizQuestionsModel;

	public constructor(quizQuestionsModel: typeof QuizQuestionsModel) {
		this.quizQuestionsModel = quizQuestionsModel;
	}

	public async create(
		entity: QuizQuestionsEntity,
	): Promise<QuizQuestionsEntity> {
		const { categoryId, label } = entity.toNewObject();

		const question = await this.quizQuestionsModel
			.query()
			.insert({
				categoryId,
				label,
			})
			.returning("*");

		return QuizQuestionsEntity.initialize({
			answers: null,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedQuestion = await this.quizQuestionsModel
			.query()
			.delete()
			.where({ id })
			.withGraphFetched(RelationName.QUIZ_ANSWERS);

		return Boolean(deletedQuestion);
	}

	public async find(id: number): Promise<null | QuizQuestionsEntity> {
		const question = await this.quizQuestionsModel.query().findById(id);

		return question
			? QuizQuestionsEntity.initialize({
					answers: question.quizAnswers,
					categoryId: question.categoryId,
					createdAt: question.createdAt,
					id: question.id,
					label: question.label,
					updatedAt: question.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<QuizQuestionsEntity[]> {
		const questions = await this.quizQuestionsModel
			.query()
			.withGraphFetched(RelationName.QUIZ_ANSWERS);

		return questions.map((question) =>
			QuizQuestionsEntity.initialize({
				answers: question.quizAnswers,
				categoryId: question.categoryId,
				createdAt: question.createdAt,
				id: question.id,
				label: question.label,
				updatedAt: question.updatedAt,
			}),
		);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { QuizQuestionsRepository };
