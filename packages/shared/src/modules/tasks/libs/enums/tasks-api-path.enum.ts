const TasksApiPath = {
	$ID: "/:id",
	$ID_DEADLINE: "/:id/deadline",
	CURRENT: "/current",
	NOTES: "/notes",
	NOTES_$ID: "/notes/:id",
	PAST: "/past",
	ROOT: "/",
} as const;

export { TasksApiPath };
