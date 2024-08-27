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

	public async createUserAnswer({
		answerId,
		userId,
	}: {
		answerId: number;
		userId: number;
	}): Promise<{
		answer: QuizAnswerEntity;
		isAnswerStored: boolean;
		isPreviousAnswerDeleted: boolean;
	}> {
		const answer = await this.find(answerId);
		let isPreviousAnswerDeleted = false;

		if (!answer) {
			throw new QuizError({
				message: ErrorMessage.NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { questionId } = answer.toObject();

		const userAnswerToQuestion =
			await this.quizAnswerRepository.findUserAnswerByQuestion(
				questionId,
				userId,
			);

		if (userAnswerToQuestion) {
			const { id } = userAnswerToQuestion.toObject();
			isPreviousAnswerDeleted =
				await this.quizAnswerRepository.deleteUserAnswer(userId, id);
		}

		const isAnswerStored = await this.quizAnswerRepository.createUserAnswer(
			userId,
			answerId,
		);

		return { answer, isAnswerStored, isPreviousAnswerDeleted };
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
