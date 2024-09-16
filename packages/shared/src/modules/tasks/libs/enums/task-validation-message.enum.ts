const TaskValidationMessage = {
	INVALID_TYPE:
		"Status must be one of the following: Completed, Current, or Skipped",
	REQUIRED: "Status field is required",
} as const;

export { TaskValidationMessage };
