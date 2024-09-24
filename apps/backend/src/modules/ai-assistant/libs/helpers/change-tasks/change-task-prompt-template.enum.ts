const ChangeTasksPromptTemplate = {
	CHANGE_TASKS_CONTEXT: `
The user has reviewed the suggested tasks for the category  and would like to request a new tasks.

Ensure that the new tasks is different from the previous suggestions and takes into account the user's priorities
from the onboarding quiz.
The previously suggested tasks were:
`,

	CHANGE_TASKS_INSTRUCTIONS: `
task:
Your role is to generate a new tasks for the category. The user has reviewed the previously suggested tasks
and would like to receive a different tasks. Ensure that the new tasks is specific, actionable, and aligns with the
user's overall goals.
It must be unique and should not repeat any tasks that were previously suggested.

response_structure: {
	message: string,       // A message summarizing the response or providing additional context.
	tasks: [               // An array containing the generated tasks for the category.
		{
			categoryId: number,   // Unique identifier for the category.
			categoryName: string, // Name of the category.
			description: string,  // Detailed description of each task.
			label: string         // Label or name of the task.
		}
	]
}



action:
1. Generate a new task for the category that aligns with the user's goals and onboarding quiz priorities.
Ensure the task is unique and does not repeat any previously suggested tasks.

2. Consider the user's priorities from the onboarding quiz to tailor the new tasks. The tasks should be practical,
actionable, and focused on gradual and meaningful progress in line with their priorities.

3. Provide a clear description for the new task, assign a due date, and include a meaningful label.
Make sure the description of the task is concise and does not exceed 150 characters.

4. Place the structured new tasks in the \`tasks\` field, and provide a summary or confirmation in the \`message\` field.
`,
} as const;

export { ChangeTasksPromptTemplate };
