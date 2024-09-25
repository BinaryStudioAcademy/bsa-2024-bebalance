import { type QuizScoreDto } from "./types.js";

type QuizScoresUpdateResponseDto = {
	items: QuizScoreDto[];
	updatedAt: string;
};

export { type QuizScoresUpdateResponseDto };
