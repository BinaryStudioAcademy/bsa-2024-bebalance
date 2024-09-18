const DatabaseTableName = {
	CATEGORIES: "categories",
	FILES: "files",
	MIGRATIONS: "migrations",
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_ANSWERS_TO_USERS: "onboarding_answers_to_users",
	ONBOARDING_QUESTIONS: "onboarding_questions",
	QUIZ_ANSWERS: "quiz_answers",
	QUIZ_ANSWERS_TO_USERS: "quiz_answers_to_users",
	QUIZ_QUESTIONS: "quiz_questions",
	QUIZ_SCORES: "quiz_scores",
	TASK_NOTES: "tasks_notes",
	TASKS: "tasks",
	USER_DETAILS: "user_details",
	USER_TASK_DAYS: "user_task_days",
	USERS: "users",
} as const;

export { DatabaseTableName };
