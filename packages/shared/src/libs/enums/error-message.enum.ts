const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	FORBIDDEN: "Access to the requested resource is denied.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INSUFFICIENT_ANSWERS: "You must provide answers for all questions.",
	MAIL_ERROR: "An error occured when sending an email.",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
} as const;

export { ErrorMessage };
