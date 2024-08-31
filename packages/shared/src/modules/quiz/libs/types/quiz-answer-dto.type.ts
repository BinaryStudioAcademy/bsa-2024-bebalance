import { type QuizUserAnswerDto } from "./types.js";

type QuizAnswerDto = {
	createdAt: string;
	id: number;
	label: string;
	questionId: number;
	updatedAt: string;
	userAnswers: QuizUserAnswerDto[];
	value: number;
};

export { type QuizAnswerDto };
