import { type OnboardingQuestionResponseDto } from "~/libs/types/types.js";

const getOnboardingDefaultValues = (
	questions: OnboardingQuestionResponseDto[],
): Record<string, null | string> => {
	const defaultValues: Record<string, null | string> = {};

	for (const question of questions) {
		defaultValues[`question${question.id.toString()}`] = null;
	}

	return defaultValues;
};

export { getOnboardingDefaultValues };
