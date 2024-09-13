import { type QuizScoresGetAllItemResponseDto } from "../../../quiz/quiz.js";

type SimplifiedQuizScoreDto = Omit<
	QuizScoresGetAllItemResponseDto,
	"createdAt" | "id" | "updatedAt" | "userId"
>;

type BalanceWheelAnalysisResponseDto = {
	lowestCategories: SimplifiedQuizScoreDto[];
	messages: {
		comments: string;
		greeting: string;
	};
	threadId: string;
};

export { type BalanceWheelAnalysisResponseDto };
