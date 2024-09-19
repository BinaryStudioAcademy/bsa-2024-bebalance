const TaskNoteValidationMessage = {
	INVALID_TASK_ID: "Task ID must be a valid number.",
	REQUIRED_CONTENT: "Note content is required.",
	REQUIRED_TASK_ID: "Please choose a task before adding a note.",
} as const;

export { TaskNoteValidationMessage };
