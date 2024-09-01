import { type QuizAnswerDto } from "./quiz-answers-dto.type.js";

type QuizQuestionDto = {
	answers: null | QuizAnswerDto[];
	categoryId: number;
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};

export { type QuizQuestionDto };
