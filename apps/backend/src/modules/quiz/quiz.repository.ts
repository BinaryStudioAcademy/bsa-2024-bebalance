import { RelationName } from "~/libs/enums/enums.js";
import { QuizQuestionsEntity } from "~/modules/quiz/quiz-questions.entity.js";

import { type QuizQuestionsModel } from "./quiz-questions.model.js";

class QuizQuestionsRepository {
	private quizQuestionsModel: typeof QuizQuestionsModel;

	public constructor(quizQuestionsModel: typeof QuizQuestionsModel) {
		this.quizQuestionsModel = quizQuestionsModel;
	}

	public async findAll(): Promise<QuizQuestionsEntity[]> {
		const questions = await this.quizQuestionsModel
			.query()
			.withGraphFetched(RelationName.QUIZ_ANSWERS);

		return questions.map((question) =>
			QuizQuestionsEntity.initialize({
				answers: question.quizAnswers,
				categoryId: question.categoryId,
				createdAt: question.createdAt,
				id: question.id,
				label: question.label,
				updatedAt: question.updatedAt,
			}),
		);
	}
}

export { QuizQuestionsRepository };
