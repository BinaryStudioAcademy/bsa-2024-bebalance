import { type QuizAnswerDto } from "./types.js";

type QuizAnswerRequestDto = Omit<
	QuizAnswerDto,
	"createdAt" | "id" | "updatedAt" | "userAnswers"
>;

export { type QuizAnswerRequestDto };
