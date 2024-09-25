import { type QuizScoresGetAllItemResponseDto } from "./quiz-scores-get-all-item-response-dto.type.js";

type QuizScoresGetAllResponseDto = {
	items: QuizScoresGetAllItemResponseDto[];
	updatedAt: string;
};

export { type QuizScoresGetAllResponseDto };
