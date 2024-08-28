import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";

import { type CategoryService } from "../categories/categories.js";
import { INITIAL_SCORE } from "./libs/constants/constants.js";
import { HTTPCode } from "./libs/enums/enums.js";
import { QuizError } from "./libs/exceptions/exceptions.js";
import {
	type QuizAnswer,
	type UserAnswer,
	type UserScore,
} from "./libs/types/types.js";
import { QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerRepository } from "./quiz-answer.repository.js";

class QuizAnswerService implements Service {
	private categoryService: CategoryService;

	private quizAnswerRepository: QuizAnswerRepository;

	public constructor(
		quizAnswerRepository: QuizAnswerRepository,
		categoryService: CategoryService,
	) {
		this.quizAnswerRepository = quizAnswerRepository;
		this.categoryService = categoryService;
	}

	public async create(payload: QuizAnswer): Promise<QuizAnswer> {
		const item = await this.quizAnswerRepository.create(
			QuizAnswerEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public async createScores({
		answerIds,
		userId,
	}: {
		answerIds: number[];
		userId: number;
	}): Promise<UserScore[]> {
		const countByCategoryId = new Map<number, number>();
		const scores = [];

		const categorizedAnswers = await Promise.all(
			answerIds.map((answerId) =>
				this.quizAnswerRepository.getCategorizedAnswer(answerId),
			),
		);

		for (const answer of categorizedAnswers) {
			const { categoryId, value } = answer;
			const currentScore = countByCategoryId.get(categoryId) || INITIAL_SCORE;
			countByCategoryId.set(categoryId, currentScore + value);
		}

		for (const [categoryId, score] of countByCategoryId.entries()) {
			const userScore = await this.categoryService.createScore({
				categoryId,
				score,
				userId,
			});
			scores.push(userScore);
		}

		return scores;
	}

	public async createUserAnswers({
		answerIds,
		userId,
	}: {
		answerIds: number[];
		userId: number;
	}): Promise<{
		scores: UserScore[];
		userAnswers: UserAnswer[];
	}> {
		const existingAnswers =
			await this.quizAnswerRepository.findByIds(answerIds);

		if (existingAnswers.length !== answerIds.length) {
			throw new QuizError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const answerEntities = existingAnswers.map((answer) => answer.toObject());
		const questionIds = answerEntities.map((answer) => answer.questionId);
		const uniqueQuestionIds = new Set(questionIds);

		if (uniqueQuestionIds.size !== questionIds.length) {
			throw new QuizError({
				message: ErrorMessage.DUPLICATE_QUESTION_ANSWER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		await this.quizAnswerRepository.deleteUserAnswers(userId);
		const userAnswersEntity = await this.quizAnswerRepository.createUserAnswers(
			userId,
			answerIds,
		);
		const userAnswers = userAnswersEntity.map((answer) => answer.toObject());

		await this.categoryService.deleteUserScores(userId);
		const scores = await this.createScores({ answerIds, userId });

		return { scores, userAnswers };
	}

	public delete(id: number): Promise<boolean> {
		return this.quizAnswerRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizAnswer> {
		const item = await this.quizAnswerRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<{ items: QuizAnswer[] }> {
		const items = await this.quizAnswerRepository.findAll();

		return { items: items.map((item) => item.toObject()) };
	}

	public async update(
		id: number,
		payload: Partial<QuizAnswer>,
	): Promise<QuizAnswer> {
		const item = await this.quizAnswerRepository.update(id, payload);

		return item.toObject();
	}
}

export { QuizAnswerService };
