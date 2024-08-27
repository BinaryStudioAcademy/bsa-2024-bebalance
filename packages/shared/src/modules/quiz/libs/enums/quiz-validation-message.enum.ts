import { QuizValidationRule } from "./quiz-validation-rule.enum.js";

const QuizValidationMessage = {
	ID_ARRAY_REQUIRED: "Array of id's is required",
	NUMBER_ID_REQUIRED: "Required answer IDs must be numbers.",
	QUESTIONS_LENGTH: `Password must be at most ${String(
		QuizValidationRule.QUESTIONS_LENGTH,
	)} characters long`,
	UNIQUE_ANSWERS: "Answers must be unique",
} as const;

export { QuizValidationMessage };
