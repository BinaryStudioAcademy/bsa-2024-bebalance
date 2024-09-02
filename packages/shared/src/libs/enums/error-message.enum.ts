const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INSUFFICIENT_ANSWERS: "You must provide answers for all questions.",
	READONLY_CATEGORY: "Modifying categories data is not allowed",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
} as const;

export { ErrorMessage };
