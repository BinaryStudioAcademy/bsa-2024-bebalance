import { type QuizScoreDto } from "shared";

import { type QuizUserAnswerDto } from "./quiz-user-answer-dto.type.js";

type QuizAnswersResponseDto = {
	scores: QuizScoreDto[];
	userAnswers: QuizUserAnswerDto[];
};

export { type QuizAnswersResponseDto };
