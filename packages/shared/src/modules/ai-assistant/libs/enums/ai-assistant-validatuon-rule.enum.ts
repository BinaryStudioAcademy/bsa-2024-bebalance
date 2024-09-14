const AiAssistantValidationRule = {
	DATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/,
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	THREAD_ID_VALID_CHARS: /^thread_[\da-z]+$/i,
} as const;

export { AiAssistantValidationRule };
