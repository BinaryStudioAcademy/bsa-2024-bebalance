import { type QuizQuestionDto } from "./types.js";

type QuizQuestionUpdatable = Omit<
	QuizQuestionDto,
	"answers" | "createdAt" | "updatedAt"
>;

export { type QuizQuestionUpdatable };
