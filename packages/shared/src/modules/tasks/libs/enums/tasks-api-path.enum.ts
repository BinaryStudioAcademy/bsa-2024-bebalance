const TasksApiPath = {
	$ID: "/:id",
	CURRENT: "/current",
	DEADLINE_$ID: "/deadline/:id",
} as const;

export { TasksApiPath };
