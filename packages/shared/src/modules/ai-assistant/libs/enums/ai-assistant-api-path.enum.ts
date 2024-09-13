const AiAssistantApiPath = {
	ADD_MESSAGE: "/chat/add-message",
	CONTINUE_CHAT: "/chat/continue",
	DELETE_CHAT: "/chat/remove",
	GENERATE_ALTERNATIVE_TASK: "/chat/generate-alternative-task",
	INIT_NEW_CHAT: "/chat/initiate",
	SUGGEST_TASKS: "/chat/suggest-tasks",
} as const;

export { AiAssistantApiPath };
