const TasksApiPath = {
	$ID: "/:id",
	$ID_DEADLINE: "/:id/deadline",
	$ID_NOTES: "/:id/notes",
	CURRENT: "/current",
	PAST: "/past",
	ROOT: "/",
} as const;

export { TasksApiPath };
