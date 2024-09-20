const ExplainTaskPromptTemplate = {
	EXPLAIN_TASK_CONTEXT: `
The user is asking for an explanation of the task that was previously suggested to them. Your role as the assistant is to
provide a clear and concise summary of the task, emphasizing its purpose and how it aligns with the user's goals.
Make sure to explain how the task contributes to the user's progress.

Task details:
`,

	EXPLAIN_TASK_INSTRUCTIONS: `
task:
Your role is to explain the task to the user. The user has requested a breakdown of the previously suggested task.
Your task is to explain its purpose and show how it helps the user achieve their personal goals. Ensure that the explanation is clear and actionable.

response_structure: {
	message: {                 // Object containing information about the task explanation.
		summary: string,         // A short summary of the task's purpose.
		details: string,         // More detailed information about the task and why it's important.
		explanation: string,     // A clear explanation of how the task aligns with the user's goals.
		steps: string,           // A string that lists the actionable steps the user should take to complete the task.
															// Use numbered format like "1. Do this. 2. Do that."
		motivation_tips: string  // Tips to help the user stay motivated while completing the task.
	}
},
}

action:
1. Provide a **summary** of the task that briefly explains its purpose and importance to the user's goals. Start with: "This task is..."
2. Offer **details** that give more context and explanation about why the task is important.
3. Explain how the task **aligns with the user's goals** and priorities, taking into account their onboarding quiz results.
4. List specific, **actionable steps** that the user should take to successfully complete the task.
5. Include **motivation tips** that encourage consistency and help the user stay focused and make gradual progress toward their goals.
`,
} as const;

export { ExplainTaskPromptTemplate };
