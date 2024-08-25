import { type Service } from "~/libs/types/types.js";
import { type QuizQuestionsRepository } from "~/modules/quiz/quiz.repository.js";
import { QuizQuestionsEntity } from "~/modules/quiz/quiz-questions.entity.js";

import {
	QuizQuestionsDto,
	QuizQuestionsGetAllReponseDto,
} from "./libs/types/types.js";

class QuizQuestionsService implements Service {
	private quizQuestionsRepository: QuizQuestionsRepository;

	public constructor(quizQuestionsRepository: QuizQuestionsRepository) {
		this.quizQuestionsRepository = quizQuestionsRepository;
	}

	public async create(payload: QuizQuestionsDto): Promise<QuizQuestionsDto> {
		const user = await this.quizQuestionsRepository.create(
			QuizQuestionsEntity.initializeNew({
				categoryId: payload.categoryId,
				label: payload.label,
			}),
		);

		return user.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
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

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { QuizQuestionsService };
