import { type QuizQuestionDto } from "./types.js";

type QuestionRequestData = Omit<
	QuizQuestionDto,
	"answers" | "createdAt" | "updatedAt"
>;

export { type QuestionRequestData };
