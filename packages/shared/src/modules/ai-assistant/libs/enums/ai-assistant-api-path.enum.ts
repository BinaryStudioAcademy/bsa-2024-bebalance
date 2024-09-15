const AiAssistantApiPath = {
	ACCEPT_TASK: "/chat/accept-task",
	ADD_MESSAGE: "/chat/add-message",
	CHANGE_TASK: "/chat/change-task",
	CONTINUE_CHAT: "/chat/continue",
	DELETE_CHAT: "/chat/remove",
	INIT_NEW_CHAT: "/chat/initiate",
	SUGGEST_TASKS: "/chat/suggest-tasks",
} as const;

export { AiAssistantApiPath };
