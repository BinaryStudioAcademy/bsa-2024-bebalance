import { type QuizAnswerDto } from "./types.js";

type QuizQuestionDto = {
	answers: QuizAnswerDto[];
	categoryId: number;
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};

export { type QuizQuestionDto };
