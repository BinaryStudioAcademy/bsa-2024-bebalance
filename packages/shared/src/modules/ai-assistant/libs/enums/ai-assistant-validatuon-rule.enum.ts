const AiAssistantValidationRule = {
	NON_EMPTY_NUMBER_MIN_LENGTH: 1,
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	THREAD_ID_VALID_CHARS: /^thread_[\da-z]+$/i,
} as const;

export { AiAssistantValidationRule };
