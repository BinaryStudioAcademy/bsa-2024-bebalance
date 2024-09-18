import { z } from "zod";

import { QuizValidationMessage } from "../enums/enums.js";

type QuizUserAnswersValidationSchema = {
	answerIds: z.ZodEffects<z.ZodArray<z.ZodNumber>, number[], number[]>;
	categoryIds: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
};

const quizUserAnswers = z.object<QuizUserAnswersValidationSchema>({
	answerIds: z
		.array(z.number({ message: QuizValidationMessage.INVALID_REQUEST }))
		.refine((ids) => new Set(ids).size === ids.length, {
			message: QuizValidationMessage.UNIQUE_ANSWERS,
		}),
	categoryIds: z
		.array(z.number({ message: QuizValidationMessage.INVALID_REQUEST }))
		.optional(),
});

export { quizUserAnswers };
