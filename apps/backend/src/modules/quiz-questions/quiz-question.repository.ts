import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/repository.type.js";

import { type QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { FIRST_ELEMENT_INDEX } from "./libs/constants/constants.js";
import { type QuizQuestionRequestDto } from "./libs/types/types.js";
import { QuizQuestionEntity } from "./quiz-question.entity.js";
import { type QuizQuestionModel } from "./quiz-question.model.js";

class QuizQuestionRepository implements Repository {
	private quizQuestionModel: typeof QuizQuestionModel;

	public constructor(quizQuestionModel: typeof QuizQuestionModel) {
		this.quizQuestionModel = quizQuestionModel;
	}

	public async countAll(): Promise<number> {
		const questionModelCount = await this.quizQuestionModel
			.query()
			.count()
			.castTo<[{ count: string }]>();

		return Number(questionModelCount[FIRST_ELEMENT_INDEX].count);
	}

	public async create(entity: QuizQuestionEntity): Promise<QuizQuestionEntity> {
		const { categoryId, label } = entity.toNewObject();
		const question = await this.quizQuestionModel
			.query()
			.insert({ categoryId, label })
			.withGraphFetched(RelationName.ANSWERS)
			.returning("*");

		return QuizQuestionEntity.initialize({
			answers: question.answers,
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
		const question = await this.quizQuestionModel
			.query()
			.findById(id)
			.withGraphJoined(RelationName.ANSWERS);

		return question
			? QuizQuestionEntity.initialize({
					answers: question.answers,
					categoryId: question.categoryId,
					createdAt: question.createdAt,
					id: question.id,
					label: question.label,
					updatedAt: question.updatedAt,
				})
			: null;
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
		payload: Partial<QuizQuestionRequestDto>,
	): Promise<QuizQuestionEntity> {
		const question = await this.quizQuestionModel
			.query()
			.patchAndFetchById(id, { ...payload })
			.withGraphJoined(RelationName.ANSWERS);

		return QuizQuestionEntity.initialize({
			answers: question.answers,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}
}

export { QuizQuestionRepository };
