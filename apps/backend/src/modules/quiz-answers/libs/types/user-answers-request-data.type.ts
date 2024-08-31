import { type QuizAnswersRequestDto } from "./types.js";

type UserAnswersRequestDto = {
	userId: number;
} & QuizAnswersRequestDto;

export { type UserAnswersRequestDto };
