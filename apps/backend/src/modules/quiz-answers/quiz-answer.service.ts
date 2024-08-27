import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";

import { HTTPCode } from "./libs/enums/enums.js";
import { QuizError } from "./libs/exceptions/exceptions.js";
import { type QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerRepository } from "./quiz-answer.repository.js";

class QuizAnswerService implements Service {
	private quizAnswerRepository: QuizAnswerRepository;

	public constructor(quizAnswerRepository: QuizAnswerRepository) {
		this.quizAnswerRepository = quizAnswerRepository;
	}

	public create(): Promise<null> {
		return Promise.resolve(null);
	}

	public async createUserAnswers({
		answerIds,
		userId,
	}: {
		answerIds: number[];
		userId: number;
	}): Promise<{
		savedAnswersCount: number;
	}> {
		const answers = await Promise.all(answerIds.map((id) => this.find(id)));
		const existingAnswers = answers.filter((answer) => answer !== null);

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
				message: ErrorMessage.DUPLICATE_ANSWER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		// TODO: Implement storing scores

		const savedAnswersCount = await this.quizAnswerRepository.createUserAnswers(
			userId,
			answerIds,
		);

		return { savedAnswersCount };
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | QuizAnswerEntity> {
		return await this.quizAnswerRepository.find(id);
	}

	public findAll(): Promise<{ items: null[] }> {
		return Promise.resolve({ items: [null] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { QuizAnswerService };
