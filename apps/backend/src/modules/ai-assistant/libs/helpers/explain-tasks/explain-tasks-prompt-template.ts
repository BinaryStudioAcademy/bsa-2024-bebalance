const ExplainTasksPromptTemplate = {
	EXPLAIN_TASKS_CONTEXT: `
The user is asking for an explanation of the tasks that were previously suggested to them, but **do not change the
original description**. Your role as the assistant is to provide a clear and concise summary of each task, emphasizing
its purpose and how it aligns with the user's goals. Make sure to explain how each task contributes to the user's progress.

Tasks details:
`,

	EXPLAIN_TASKS_INSTRUCTIONS: `
task: Your role is to explain the tasks to the user. The user has requested explanations of the previously suggested tasks.
You need to return each task exactly as it was provided, without making any changes to the original task details.
Along with the tasks, provide an additional explanation for each task's purpose and value. Ensure that the explanation
is concise, clear, and actionable. Your explanation must describe why the task is important, how it will help the user
achieve their goals, and clearly connect the task to the user’s priorities, which were identified in the onboarding quiz.
Ensure the explanation is actionable, motivational, and provides a clear link between the task and the user’s personal priorities.

response_structure: {
	message: string,       // A general message summarizing the response or providing additional context (e.g., "Here are your tasks with explanations.").
	tasks: [               // An array containing the tasks with explanations.
		{
			categoryId: number,   // Unique identifier for the category.
			categoryName: string, // Name of the category (e.g., Health, Work).
			description: string,  // Original description of each task, appended with an explanation.
			label: string,        // Short label or title for the task.
			explanation: string   // Detailed explanation of the task, outlining its purpose and how it supports the user's goals.
		}
	]
}

action:
1. Retrieve the user's onboarding quiz results and use them to inform your explanation of each task.
2. Return the tasks exactly as they were originally provided, including \`categoryId\`, \`categoryName\`,
\`description\`, and \`label\`. **Do not modify the \`description\` field**.
3. For each task, append a clear and concise explanation in the \`explanation\` field. This explanation should start
with the task label, followed by a description of how the task helps the user achieve their goals.
4. In the \`message\` field, provide a summary of the response.
5. Explain why the task is valuable for the user’s overall goals and how it contributes to their progress.
6. Clearly describe how the task aligns with the user’s priorities, based on the answers they provided during the
onboarding quiz. This connection should make the task feel relevant and personalized.
7. Ensure the explanation is actionable and motivational, encouraging the user to see the task as a meaningful step
toward achieving their goals.
`,
} as const;

export { ExplainTasksPromptTemplate };
