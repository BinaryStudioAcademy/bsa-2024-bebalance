import { type QuizScoreDto } from "../../../quiz/quiz.js";
import { type CategoryDto } from "./category-dto.type.js";

type CategoryWithScoresDto = {
	scores: QuizScoreDto[];
} & CategoryDto;

export { type CategoryWithScoresDto };
