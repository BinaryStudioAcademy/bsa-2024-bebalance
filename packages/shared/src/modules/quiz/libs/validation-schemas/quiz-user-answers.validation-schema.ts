import { z } from "zod";

import { QuizValidationMessage, QuizValidationRule } from "../enums/enums.js";

type QuizUserAnswersValidationSchema = {
	answerIds: z.ZodEffects<
		z.ZodArray<z.ZodNumber, "atleastone">,
		number[],
		number[]
	>;
};

const quizUserAnswers = z.object<QuizUserAnswersValidationSchema>({
	answerIds: z
		.array(z.number({ message: QuizValidationMessage.NUMBER_ID_REQUIRED }))
		.nonempty({ message: QuizValidationMessage.ID_ARRAY_REQUIRED })
		.length(QuizValidationRule.QUESTIONS_LENGTH, {
			message: QuizValidationMessage.QUESTIONS_LENGTH,
		})
		.refine((ids) => new Set(ids).size === ids.length, {
			message: QuizValidationMessage.UNIQUE_ANSWERS,
		}),
});

export { quizUserAnswers };
