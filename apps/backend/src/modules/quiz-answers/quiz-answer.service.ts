import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import {
	type CategoryService,
	type QuizScoreDto,
} from "../categories/categories.js";
import { type QuizQuestionService } from "../quiz-questions/quiz-questions.js";
import { INITIAL_STATISTIC_VALUE } from "./libs/constants/constants.js";
import { QuizError } from "./libs/exceptions/exceptions.js";
import {
	type CategoryStatistic,
	type QuizAnswerDto,
	type QuizAnswerRequestDto,
	type QuizAnswersResponseDto,
	type UserAnswersRequestData,
} from "./libs/types/types.js";
import { QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerRepository } from "./quiz-answer.repository.js";

class QuizAnswerService implements Service {
	private categoryService: CategoryService;

	private quizAnswerRepository: QuizAnswerRepository;

	private quizQuestionService: QuizQuestionService;

	public constructor(
		quizAnswerRepository: QuizAnswerRepository,
		categoryService: CategoryService,
		quizQuestionService: QuizQuestionService,
	) {
		this.quizAnswerRepository = quizAnswerRepository;
		this.categoryService = categoryService;
		this.quizQuestionService = quizQuestionService;
	}

	public async create(payload: QuizAnswerRequestDto): Promise<QuizAnswerDto> {
		const answer = await this.quizAnswerRepository.create(
			QuizAnswerEntity.initializeNew(payload),
		);

		return answer.toObject();
	}

	public async createScores({
		answerIds,
		userId,
	}: UserAnswersRequestData): Promise<QuizScoreDto[]> {
		const categoryStatistics = new Map<number, CategoryStatistic>();
		const scores = [];

		const categorizedAnswers = await Promise.all(
			answerIds.map((answerId) => {
				return this.quizAnswerRepository.getCategorizedAnswer(answerId);
			}),
		);

		for (const answer of categorizedAnswers) {
			const { categoryId, value } = answer;
			const statistic = categoryStatistics.get(categoryId) || {
				accumulatedSum: INITIAL_STATISTIC_VALUE,
				categoryCount: INITIAL_STATISTIC_VALUE,
			};
			statistic.accumulatedSum += value;
			statistic.categoryCount += 1;
			categoryStatistics.set(categoryId, statistic);
		}

		for (const [categoryId, stats] of categoryStatistics.entries()) {
			const averageScore = Math.round(
				stats.accumulatedSum / stats.categoryCount,
			);
			const userScore = await this.categoryService.createScore({
				categoryId,
				score: averageScore,
				userId,
			});
			scores.push(userScore);
		}

		return scores;
	}

	public async createUserAnswers({
		answerIds,
		userId,
	}: UserAnswersRequestData): Promise<QuizAnswersResponseDto> {
		const existingAnswers =
			await this.quizAnswerRepository.findByIds(answerIds);

		if (existingAnswers.length !== answerIds.length) {
			throw new QuizError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const questionsCount = await this.quizQuestionService.countAll();

		if (questionsCount !== existingAnswers.length) {
			throw new QuizError({
				message: ErrorMessage.INSUFFICIENT_ANSWERS,
				status: HTTPCode.BAD_REQUEST,
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
		const userAnswers = await this.quizAnswerRepository.createUserAnswers(
			userId,
			answerIds,
		);

		await this.categoryService.deleteUserScores(userId);
		const scores = await this.createScores({ answerIds, userId });

		return { scores, userAnswers };
	}

	public delete(id: number): Promise<boolean> {
		return this.quizAnswerRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizAnswerDto> {
		const answer = await this.quizAnswerRepository.find(id);

		return answer ? answer.toObject() : null;
	}

	public async findAll(): Promise<{ items: QuizAnswerDto[] }> {
		const answers = await this.quizAnswerRepository.findAll();

		return { items: answers.map((answer) => answer.toObject()) };
	}

	public async update(
		id: number,
		payload: Partial<QuizAnswerRequestDto>,
	): Promise<QuizAnswerDto> {
		const answer = await this.quizAnswerRepository.update(id, payload);

		return answer.toObject();
	}
}

export { QuizAnswerService };
