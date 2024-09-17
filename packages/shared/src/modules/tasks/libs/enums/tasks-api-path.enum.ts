const TasksApiPath = {
	$ID: "/:id",
	CURRENT: "/current",
	DEADLINE_$ID: "/deadline/:id",
	PAST: "/past",
} as const;

export { TasksApiPath };
