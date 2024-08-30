import { z } from "zod";

import { OnboardingValidationMessage } from "../enums/enums.js";

type OnboardingAnswersValidationDto = {
	answerIds: z.ZodEffects<z.ZodArray<z.ZodNumber>, number[], number[]>;
};

const onboardingAnswers = z.object<OnboardingAnswersValidationDto>({
	answerIds: z
		.array(
			z.number({ message: OnboardingValidationMessage.NUMBER_ID_REQUIRED }),
		)
		.refine((ids) => new Set(ids).size === ids.length, {
			message: OnboardingValidationMessage.UNIQUE_ANSWERS,
		}),
});

export { onboardingAnswers };
