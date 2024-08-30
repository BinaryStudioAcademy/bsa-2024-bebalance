import { RelationName } from "~/libs/enums/relation-name.enum.js";
import { type Repository } from "~/libs/types/repository.type.js";

import { type QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { type QuizQuestionUpdatable } from "./libs/types/types.js";
import { type QuizQuestionModel } from "./quiz-question.model.js";
import { QuizQuestionEntity } from "./quiz-questions.entity.ts.js";

class QuizQuestionRepository implements Repository {
	private quizQuestionModel: typeof QuizQuestionModel;

	public constructor(quizQuestionModel: typeof QuizQuestionModel) {
		this.quizQuestionModel = quizQuestionModel;
	}

	public async create(entity: QuizQuestionEntity): Promise<QuizQuestionEntity> {
		const { categoryId, label } = entity.toNewObject();
		const question = await this.quizQuestionModel
			.query()
			.insert({ categoryId, label })
			.returning("*");

		const answers = await this.quizQuestionModel
			.relatedQuery(RelationName.ANSWERS)
			.for(question.id)
			.select("*");

		return QuizQuestionEntity.initialize({
			answers,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.quizQuestionModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async find(id: number): Promise<null | QuizQuestionEntity> {
		const question = await this.quizQuestionModel.query().findById(id);

		if (!question) {
			return null;
		}

		const answers = await this.quizQuestionModel
			.relatedQuery(RelationName.ANSWERS)
			.for(question.id)
			.select("*");

		return QuizQuestionEntity.initialize({
			answers,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}

	public async findAll(): Promise<QuizQuestionEntity[]> {
		const questions = await this.quizQuestionModel.query().select("*");

		return await Promise.all(
			questions.map(async (question) => {
				const answersModel = await this.quizQuestionModel
					.relatedQuery(RelationName.ANSWERS)
					.for(question.id)
					.select("*")
					.castTo<QuizAnswerModel[]>();

				return QuizQuestionEntity.initialize({
					answers: answersModel,
					categoryId: question.categoryId,
					createdAt: question.createdAt,
					id: question.id,
					label: question.label,
					updatedAt: question.updatedAt,
				});
			}),
		);
	}

	public async update(
		id: number,
		payload: QuizQuestionUpdatable,
	): Promise<QuizQuestionEntity> {
		const question = await this.quizQuestionModel
			.query()
			.patchAndFetchById(id, { ...payload });

		const answers = await this.quizQuestionModel
			.relatedQuery(RelationName.ANSWERS)
			.for(question.id)
			.select("*");

		return QuizQuestionEntity.initialize({
			answers,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}
}

export { QuizQuestionRepository };
