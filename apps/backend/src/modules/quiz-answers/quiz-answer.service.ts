import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/service.type.js";

import { type UserService } from "../users/users.js";
import { HTTPCode } from "./libs/enums/enums.js";
import { QuizError } from "./libs/exceptions/exceptions.js";
import { type QuizAnswerEntity } from "./quiz-answer.entity.js";
import { type QuizAnswerRepository } from "./quiz-answer.repository.js";

class QuizAnswerService implements Service {
	private quizAnswerRepository: QuizAnswerRepository;

	private userService: UserService;

	public constructor(
		quizAnswerRepository: QuizAnswerRepository,
		userService: UserService,
	) {
		this.quizAnswerRepository = quizAnswerRepository;
		this.userService = userService;
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
	}): Promise<{ relationId: number }> {
		const user = await this.userService.find(userId);
		const answer = await this.find(answerId);

		if (!answer || !user) {
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
			await this.quizAnswerRepository.deleteUserAnswer(userId, id);
		}

		return await this.quizAnswerRepository.createUserAnswer(userId, answerId);
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
