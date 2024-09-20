const TasksApiPath = {
	$ID: "/:id",
	CURRENT: "/current",
	NOTES: "/notes",
	NOTES_$ID: "/notes/:id",
	PAST: "/past",
} as const;

export { TasksApiPath };
