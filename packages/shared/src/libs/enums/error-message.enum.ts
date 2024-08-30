const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	MISSING_QUESTION_ANSWERS: "Not all questions have been answered.",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
} as const;

export { ErrorMessage };
