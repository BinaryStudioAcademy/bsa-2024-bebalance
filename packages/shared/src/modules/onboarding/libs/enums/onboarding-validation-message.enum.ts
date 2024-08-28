import { OnboardingValidationRule } from "./onboarding-validation-rule.enum.js";

const OnboardingValidationMessage = {
	NUMBER_ID_REQUIRED: "Required answer IDs must be numbers.",
	QUESTIONS_LENGTH: `Answers for all ${String(
		OnboardingValidationRule.QUESTIONS_LENGTH,
	)} questions are required.`,
	UNIQUE_ANSWERS: "Answers must be unique.",
} as const;

export { OnboardingValidationMessage };
