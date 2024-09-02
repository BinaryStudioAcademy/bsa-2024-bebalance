import { type QuizAnswerModel } from "../../quiz-answer.model.js";

type CategorizedQuizAnswerModel = {
	question: {
		category: {
			id: number;
		};
	};
} & QuizAnswerModel;

export { type CategorizedQuizAnswerModel };
