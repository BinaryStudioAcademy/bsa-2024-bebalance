import { type QuizScoreDto } from "./quiz-score-dto.type.js";
import { type QuizUserAnswerDto } from "./quiz-user-answer-dto.type.js";

type QuizAnswersResponseDto = {
	scores: QuizScoreDto[];
	userAnswers: QuizUserAnswerDto[];
};

export { type QuizAnswersResponseDto };
