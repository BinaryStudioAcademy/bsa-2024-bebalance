import { type Service } from "~/libs/types/service.type.js";

import {
	type QuizQuestionDto,
	type QuizQuestionsGetAllReponseDto,
} from "./libs/types/types.js";
import { type QuizQuestionsRepository } from "./quiz.repository.js";
import { QuizQuestionsEntity } from "./quiz-questions.entity.js";

class QuizQuestionsService implements Service {
	private quizQuestionsRepository: QuizQuestionsRepository;

	public constructor(quizQuestionsRepository: QuizQuestionsRepository) {
		this.quizQuestionsRepository = quizQuestionsRepository;
	}
	public async create(payload: QuizQuestionDto): Promise<QuizQuestionDto> {
		const user = await this.quizQuestionsRepository.create(
			QuizQuestionsEntity.initializeNew({
				categoryId: payload.categoryId,
				label: payload.label,
			}),
		);

		return user.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.quizQuestionsRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizQuestionsEntity> {
		return await this.quizQuestionsRepository.find(id);
	}

	public async findAll(): Promise<QuizQuestionsGetAllReponseDto> {
		const items = await this.quizQuestionsRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	update(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}
}

export { QuizQuestionsService };
