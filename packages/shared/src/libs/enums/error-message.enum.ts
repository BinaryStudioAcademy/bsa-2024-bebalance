const ErrorMessage = {
	DUPLICATE_QUESTION_ANSWER: "There are multiple answers to the same question.",
	EMAIL_NOT_FOUND: "Email does not exist.",
	FILE_DOES_NOT_EXIST: "This file does not exist.",
	FILE_MISSING:
		"A required file is missing. Please ensure that all necessary files are included and try again.",
	FORBIDDEN: "Access to the requested resource is denied.",
	INCORRECT_CREDENTIALS: "Invalid email or password.",
	INSUFFICIENT_ANSWERS: "You must provide answers for all questions.",
	INVALID_CATEGORY: "Provided category does not exist.",
	LARGE_FILE_SIZE: "File should not be larger than 1 MB.",
	MAIL_ERROR: "An error occured when sending an email.",
	REQUESTED_ENTITY_NOT_FOUND: "The requested entity was not found.",
	RESET_PASSWORD_LINK_EXPIRED:
		"This link has expired. Please initiate the password reset process again.",
	SCORES_UPDATE_UNAVAILABLE:
		"Scores cannot be updated before the quiz is taken.",
	TASK_DAYS_NOT_DEFINED:
		"You must define the days for tasks before creating or doing actions on tasks.",
	TASK_MISSING: "This task does not exist for the current account.",
	UNAUTHORIZED: "You are unauthorized to access the requested resource.",
	UNSUPPORTED_FILE_TYPE: "Unsupported file type.",
} as const;

export { ErrorMessage };
