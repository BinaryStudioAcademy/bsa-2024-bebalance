// import { RelationName } from "~/libs/enums/enums.js";
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
		const question = await this.quizQuestionsModel.query().findById(id);

		return question
			? QuizQuestionsEntity.initialize({
					categoryId: question.categoryId,
					createdAt: question.createdAt,
					id: question.id,
					label: question.label,
					updatedAt: question.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<QuizQuestionsEntity[]> {
		const questions = await this.quizQuestionsModel.query();

		return questions.map((question) =>
			QuizQuestionsEntity.initialize({
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
