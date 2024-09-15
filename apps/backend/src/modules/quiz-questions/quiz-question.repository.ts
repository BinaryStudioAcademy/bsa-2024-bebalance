import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/repository.type.js";

import { type QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { QuizAnswerEntity } from "../quiz-answers/quiz-answers.js";
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
			.withGraphFetched(RelationName.QUIZ_ANSWERS)
			.returning("*");

		const answerEntities = question.answers.map((answer) => {
			return QuizAnswerEntity.initializeNew(answer);
		});

		return QuizQuestionEntity.initialize({
			answers: answerEntities,
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
			.withGraphJoined(RelationName.QUIZ_ANSWERS);

		if (!question) {
			return null;
		}

		const answerEntities = question.answers.map((answer) => {
			return QuizAnswerEntity.initializeNew(answer);
		});

		return QuizQuestionEntity.initialize({
			answers: answerEntities,
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
					.relatedQuery(RelationName.QUIZ_ANSWERS)
					.for(question.id)
					.select("*")
					.castTo<QuizAnswerModel[]>();

				const answerEntities = answersModel.map((answer) => {
					return QuizAnswerEntity.initialize(answer);
				});

				return QuizQuestionEntity.initialize({
					answers: answerEntities,
					categoryId: question.categoryId,
					createdAt: question.createdAt,
					id: question.id,
					label: question.label,
					updatedAt: question.updatedAt,
				});
			}),
		);
	}

	public async findByIds(categoryIds: number[]): Promise<QuizQuestionEntity[]> {
		const questions = await this.quizQuestionModel
			.query()
			.whereIn("categoryId", categoryIds)
			.select("*");

		return await Promise.all(
			questions.map(async (question) => {
				const answersModel = await this.quizQuestionModel
					.relatedQuery(RelationName.QUIZ_ANSWERS)
					.for(question.id)
					.select("*")
					.castTo<QuizAnswerModel[]>();

				const answerEntities = answersModel.map((answer) => {
					return QuizAnswerEntity.initialize(answer);
				});

				return QuizQuestionEntity.initialize({
					answers: answerEntities,
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
			.withGraphJoined(RelationName.QUIZ_ANSWERS);

		const answerEntities = question.answers.map((answer) => {
			return QuizAnswerEntity.initializeNew(answer);
		});

		return QuizQuestionEntity.initialize({
			answers: answerEntities,
			categoryId: question.categoryId,
			createdAt: question.createdAt,
			id: question.id,
			label: question.label,
			updatedAt: question.updatedAt,
		});
	}
}

export { QuizQuestionRepository };
