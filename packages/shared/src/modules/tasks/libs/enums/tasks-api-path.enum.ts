const TasksApiPath = {
	$ID: "/:id",
	CURRENT: "/current",
	DEADLINE_$ID: "/deadline/:id",
	NOTES: "/notes",
	NOTES_$ID: "/notes/:id",
	PAST: "/past",
} as const;

export { TasksApiPath };
