import { type Service } from "~/libs/types/service.type.js";

import {
	type QuizQuestionDto,
	type QuizQuestionRequestDto,
} from "./libs/types/types.js";
import { QuizQuestionEntity } from "./quiz-question.entity.js";
import { type QuizQuestionRepository } from "./quiz-question.repository.js";

class QuizQuestionService implements Service {
	private quizQuestionRepository: QuizQuestionRepository;

	public constructor(quizQuestionRepository: QuizQuestionRepository) {
		this.quizQuestionRepository = quizQuestionRepository;
	}

	public async create(
		payload: QuizQuestionRequestDto,
	): Promise<QuizQuestionDto> {
		const question = await this.quizQuestionRepository.create(
			QuizQuestionEntity.initializeNew(payload),
		);

		return question.toObject();
	}

	public delete(id: number): Promise<boolean> {
		return this.quizQuestionRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizQuestionDto> {
		const question = await this.quizQuestionRepository.find(id);

		return question?.toObject() ?? null;
	}

	public async findAll(): Promise<{ items: QuizQuestionDto[] }> {
		const questions = await this.quizQuestionRepository.findAll();

		return { items: questions.map((question) => question.toObject()) };
	}

	public async update(
		id: number,
		payload: Partial<QuizQuestionRequestDto>,
	): Promise<QuizQuestionDto> {
		const question = await this.quizQuestionRepository.update(id, payload);

		return question.toObject();
	}
}

export { QuizQuestionService };
