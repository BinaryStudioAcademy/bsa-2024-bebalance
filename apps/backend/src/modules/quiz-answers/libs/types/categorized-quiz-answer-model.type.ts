import { type QuizAnswerModel } from "../../quiz-answer.model.js";

type CategoriezedQuizAnswerModel = {
	question: {
		category: {
			id: number;
		};
	};
} & QuizAnswerModel;

export { type CategoriezedQuizAnswerModel };
