import { z } from "zod";

import { QuizValidationMessage } from "../enums/enums.js";

type QuizUserAnswersValidationSchema = {
	answerIds: z.ZodEffects<z.ZodArray<z.ZodNumber>, number[], number[]>;
};

const quizUserAnswers = z.object<QuizUserAnswersValidationSchema>({
	answerIds: z
		.array(z.number({ message: QuizValidationMessage.NUMBER_ID_REQUIRED }))
		.refine((ids) => new Set(ids).size === ids.length, {
			message: QuizValidationMessage.UNIQUE_ANSWERS,
		}),
});

export { quizUserAnswers };
