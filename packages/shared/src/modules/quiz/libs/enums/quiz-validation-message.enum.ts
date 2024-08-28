import { QuizValidationRule } from "./quiz-validation-rule.enum.js";

const QuizValidationMessage = {
	NUMBER_ID_REQUIRED: "Required answer IDs must be numbers.",
	QUESTIONS_LENGTH: `Answers for all ${String(
		QuizValidationRule.QUESTIONS_LENGTH,
	)} questions are required.`,
	UNIQUE_ANSWERS: "Answers must be unique.",
} as const;

export { QuizValidationMessage };
