import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { QuizQuestionsEntity } from "~/modules/quiz/quiz-questions.entity.js";

import { QuizQuestionsModel } from "./quiz-questions.model.js";

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

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | QuizQuestionsEntity> {
		const question = await this.quizQuestionsModel
			.query()
			.withGraphFetched(RelationName.QUIZ_ANSWERS)
			.findById(id);

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
