const AiAssistantApiPath = {
	ADD_MESSAGE: "/thread/add-message",
	CONTINUE_THREAD: "/thread/continue",
	GENERATE_ALTERNATIVE_TASKS: "/thread/generate-alternative-tasks",
	INITIATE_THREAD: "/thread/initiate",
	REMOVE_THREAD: "/thread/remove",
	SUGGEST_TASKS: "/thread/suggest-tasks",
} as const;

export { AiAssistantApiPath };
