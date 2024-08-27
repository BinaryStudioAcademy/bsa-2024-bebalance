import { type OnboardingAnswerDto } from "./onboarding-answer-dto.type.js";

type OnboardingQuestionDto = {
	answers: OnboardingAnswerDto[];
	createdAt: string;
	id: number;
	label: string;
	updatedAt: string;
};
export { type OnboardingQuestionDto };
