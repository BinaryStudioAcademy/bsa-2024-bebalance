import { z } from "zod";

import {
	OnboardingValidationMessage,
	OnboardingValidationRule,
} from "../enums/enums.js";

const oneAnswerSelected = z
	.object({
		answer: z.coerce
			.string()
			.min(
				OnboardingValidationRule.REQUIRE_ONE_OPTION,
				OnboardingValidationMessage.ONE_ANSWER_REQUIRED,
			),
	})
	.required();

export { oneAnswerSelected };
