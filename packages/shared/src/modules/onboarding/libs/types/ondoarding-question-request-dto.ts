import { type OnboardingAnswerDto } from "./onboarding-answer-dto.type.js";

type OnboardingQuestionRequestDto = {
	answers: OnboardingAnswerDto[];
	id: number;
	label: string;
};

export { type OnboardingQuestionRequestDto };
