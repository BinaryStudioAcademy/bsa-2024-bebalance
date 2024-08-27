import { SurveyAnswerDto } from "./survey-ansver-dto.type.js";

type SurveyResponseDto = {
	answers: SurveyAnswerDto[];
	categoryId?: number;
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};
export { type SurveyResponseDto };
