type SimplifiedQuizScoreDto = {
	categoryId: number;
	categoryName: string;
};

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
