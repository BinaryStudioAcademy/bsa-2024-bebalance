import { z } from "zod";

import {
	OnboardingValidationMessage,
	OnboardingValidationRule,
} from "../enums/enums.js";

type OnboardingAnswersValidationDto = {
	answerIds: z.ZodEffects<z.ZodArray<z.ZodNumber>, number[], number[]>;
};

const onboardingAnswers = z.object<OnboardingAnswersValidationDto>({
	answerIds: z
		.array(
			z.number({ message: OnboardingValidationMessage.NUMBER_ID_REQUIRED }),
		)
		.length(OnboardingValidationRule.QUESTIONS_LENGTH, {
			message: OnboardingValidationMessage.QUESTIONS_LENGTH,
		})
		.refine((ids) => new Set(ids).size === ids.length, {
			message: OnboardingValidationMessage.UNIQUE_ANSWERS,
		}),
});

export { onboardingAnswers };
