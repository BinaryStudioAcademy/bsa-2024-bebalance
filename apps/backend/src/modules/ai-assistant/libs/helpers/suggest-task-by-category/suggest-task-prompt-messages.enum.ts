const SuggestTaskPromptTemplates = {
	SUGGEST_TASKS_CONTEXT: `
The user has selected the following categories that are important for their personal growth and improvement.
Each category represents an area where the user would like to make progress.
Categories:
`,
	SUGGEST_TASKS_INSTRUCTIONS: `
task:
You should analyze the selected categories in combination with the user's responses from the onboarding process,
and suggest specific and actionable tasks for each category that the user has selected for improvement.
Ensure the tasks are realistic, motivational, and can be easily integrated into the user's daily routine.
Provide no more than one task per category.

response_structure:
{
	message: string,        // A message summarizing the suggested tasks.
	tasks: [                // An array of tasks associated with each category.
		{
			categoryId: number,   // Unique identifier for the category.
			categoryName: string, // Name of the category.
			description: string,  // Detailed description of the task.
			dueDate: string,      // Suggested due date for the task.
			label: string         // Label or name of the task.
		}
	]
}

action:
1. Analyze the categories selected by the user and generate one specific and achievable task for each category.
The tasks should be practical and motivating, focusing on gradual and meaningful progress while considering the user's onboarding responses.

2. For each task, provide a clear description, assign a due date, and include a meaningful label.
The tasks should be easy to follow and achievable.

3. Place the structured task suggestions in the \`tasks\` field of the response, and provide a summary in the \`message\` field.
`,
} as const;

export { SuggestTaskPromptTemplates };
