const OpenAIRunStatus = {
	COMPLETED: "completed",
	IN_PROGRESS: "in_progress",
	QUEUED: "queued",
	REQUIRE_ACTIONS: "requires_action",
} as const;

export { OpenAIRunStatus };
