import { type QuizScoresGetAllItemResponseDto } from "../../../quiz/quiz.js";

type SimplifiedQuizScoreDto = Omit<
	QuizScoresGetAllItemResponseDto,
	"createdAt" | "id" | "updatedAt" | "userId"
>;

type BalanceWheelAnalysisResponseDto = {
	lowestCategories: SimplifiedQuizScoreDto[];
	text: string;
	threadId: string;
};

export { type BalanceWheelAnalysisResponseDto };
