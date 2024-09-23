const ChangeTaskPromptTemplate = {
	CHANGE_TASKS_CONTEXT: `
The user has reviewed the suggested task for the category  and would like to request a new task.

Ensure that the new task is different from the previous suggestions and takes into account the user's priorities
from the onboarding quiz.
The previously suggested task was:
`,

	CHANGE_TASKS_INSTRUCTIONS: `
task:
Your role is to generate a new task for the category. The user has reviewed the previously suggested task
and would like to receive a different task. Ensure that the new task is specific, actionable, and aligns with the
user's overall goals.
It must be unique and should not repeat any tasks that were previously suggested.

response_structure:
{
	message: string,        // A message summarizing the new task.
	task: {                 // The new task generated for the category.
		categoryId: number,   // Unique identifier for the category.
		categoryName: string, // Name of the category.
		description: string,  // Detailed description of the new task.
		label: string         // Label or name of the new task.
	}
}

action:
1. Generate a new task for the category that aligns with the user's goals and onboarding quiz priorities.
Ensure the task is unique and does not repeat any previously suggested tasks.

2. Consider the user's priorities from the onboarding quiz to tailor the new task. The task should be practical, actionable,
and focused on gradual and meaningful progress in line with their priorities.

3. Provide a clear description for the new task, assign a due date, and include a meaningful label.

4. Place the structured new task in the \`tasks\` field, and provide a summary or confirmation in the \`message\` field.
`,
} as const;

export { ChangeTaskPromptTemplate };
