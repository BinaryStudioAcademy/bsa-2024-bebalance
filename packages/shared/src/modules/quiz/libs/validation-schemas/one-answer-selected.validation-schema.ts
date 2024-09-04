import { z } from "zod";

import { QuizValidationMessage, QuizValidationRule } from "../enums/enums.js";

const oneAnswerSelected = z
	.object({
		answer: z.coerce
			.string()
			.min(
				QuizValidationRule.REQUIRE_ONE_OPTION,
				QuizValidationMessage.ONE_ANSWER_REQUIRED,
			),
	})
	.required();

export { oneAnswerSelected };
