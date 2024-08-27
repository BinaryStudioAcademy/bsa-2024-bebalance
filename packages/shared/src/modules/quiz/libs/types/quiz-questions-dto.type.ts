import { type QuizAnswersDto } from "./quiz-answers-dto.type.js";

type QuizQuestionsDto = {
	answers: QuizAnswersDto[];
	categoryId: number;
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};

export { type QuizQuestionsDto };
