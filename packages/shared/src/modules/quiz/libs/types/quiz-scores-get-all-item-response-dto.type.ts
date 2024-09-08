import { type QuizScoreDto } from "./types.js";

type QuizScoresGetAllItemResponseDto = {
	categoryName: string;
} & QuizScoreDto;

export { type QuizScoresGetAllItemResponseDto };
