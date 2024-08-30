import { type QuizAnswerDto } from "~/modules/quiz-answers/quiz-answers.js";

type QuizQuestionDto = {
	answers: QuizAnswerDto[];
	categoryId: number;
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};

export { type QuizQuestionDto };
