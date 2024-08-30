import { type OnboardingAnswerDto } from "./onboarding-answer-dto.type.js";

type OnboardingQuestionResponseDto = {
	answers: OnboardingAnswerDto[];
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};
export { type OnboardingQuestionResponseDto };
