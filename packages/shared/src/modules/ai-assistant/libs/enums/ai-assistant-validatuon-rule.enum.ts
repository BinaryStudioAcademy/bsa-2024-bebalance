const AIAssistantValidationRule = {
	NON_EMPTY_ITEM_MIN_LENGTH: 1,
	THREAD_ID_VALID_CHARS: /^thread_[\da-z]+$/i,
} as const;

export { AIAssistantValidationRule };
