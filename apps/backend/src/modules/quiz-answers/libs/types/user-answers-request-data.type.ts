import { type QuizAnswersRequestDto } from "./types.js";

type UserAnswersRequestData = {
	userId: number;
} & QuizAnswersRequestDto;

export { type UserAnswersRequestData };
