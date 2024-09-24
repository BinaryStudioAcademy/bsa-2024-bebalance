import { type QuizScoreDto } from "./types.js";

type QuizScoresResponseDto = {
	items: QuizScoreDto[];
	updatedAt: string;
};

export { type QuizScoresResponseDto };
