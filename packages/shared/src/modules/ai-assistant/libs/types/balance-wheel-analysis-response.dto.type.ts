import { type QuizScoresGetAllItemResponseDto } from "../../../quiz/quiz.js";

type SimplifiedQuizScoreDto = Omit<
	QuizScoresGetAllItemResponseDto,
	"createdAt" | "id" | "score" | "updatedAt" | "userId"
>;

type BalanceWheelAnalysisResponseDto = {
	lowestCategories: SimplifiedQuizScoreDto[];
	messages: {
		comments: string;
		greeting: string;
		question: string;
	};
	threadId: string;
};

export { type BalanceWheelAnalysisResponseDto };