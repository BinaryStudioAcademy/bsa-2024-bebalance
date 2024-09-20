import { type SimplifiedQuizScoreDto } from "./simplified-quiz-score-dto.type.js";

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
