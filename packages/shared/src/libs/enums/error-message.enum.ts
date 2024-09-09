const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	FILE_DOES_NOT_EXIST: "This file does not exist.",
	FILE_MISSING:
		"A required file is missing. Please ensure that all necessary files are included and try again.",
	FORBIDDEN: "Access to the requested resource is denied.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INSUFFICIENT_ANSWERS: "You must provide answers for all questions.",
	LARGE_FILE_SIZE: "File is too large.",
	MAIL_ERROR: "An error occured when sending an email.",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
	UNSUPPORTED_FILE_TYPE: "Unsupported file type.",
} as const;

export { ErrorMessage };
