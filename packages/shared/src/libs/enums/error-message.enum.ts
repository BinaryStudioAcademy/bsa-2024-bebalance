const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	EMAIL_NOT_FOUND: "Email does not exist.",
	FORBIDDEN: "Access to the requested resource is denied.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INSUFFICIENT_ANSWERS: "You must provide answers for all questions.",
	MAIL_ERROR: "An error occured when sending an email.",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	RESET_PASSWORD_LINK_EXPIRED:
		"This link has expired. Please initiate the password reset process again.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
} as const;

export { ErrorMessage };
