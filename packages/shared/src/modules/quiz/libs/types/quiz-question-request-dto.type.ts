import { type QuizQuestionDto } from "./types.js";

type QuizQuestionRequestDto = Omit<
	QuizQuestionDto,
	"answers" | "createdAt" | "id" | "updatedAt"
>;

export { type QuizQuestionRequestDto };
