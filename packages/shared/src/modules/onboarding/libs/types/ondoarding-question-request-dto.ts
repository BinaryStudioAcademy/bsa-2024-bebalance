import { type OnboardingAnswerRequestDto } from "./onboarding-answer-request-dto.js";

type OnboardingQuestionRequestDto = {
	answers: OnboardingAnswerRequestDto[];
	id: number;
	label: string;
};

export { type OnboardingQuestionRequestDto };
