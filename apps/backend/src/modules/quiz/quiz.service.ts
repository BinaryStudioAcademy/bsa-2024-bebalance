import { type QuizQuestionsRepository } from "~/modules/quiz/quiz.repository.js";

import { type QuizQuestionsDto } from "./libs/types/types.js";

class QuizQuestionsService {
	private quizQuestionsRepository: QuizQuestionsRepository;

	public constructor(quizQuestionsRepository: QuizQuestionsRepository) {
		this.quizQuestionsRepository = quizQuestionsRepository;
	}

	public async findAll(): Promise<QuizQuestionsDto[]> {
		const items = await this.quizQuestionsRepository.findAll();

		return items.map((item) => item.toObject());
	}
}

export { QuizQuestionsService };
