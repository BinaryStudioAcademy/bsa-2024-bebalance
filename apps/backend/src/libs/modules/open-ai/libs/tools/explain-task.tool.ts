import { OpenAIFunctionName } from "../enums/open-ai-function-name.enum.js";

const ExplainTaskTool = {
	function: {
		description:
			"Provides a detailed explanation of the task, including its purpose, steps for completion, and how it aligns with the user's goals.",
		name: OpenAIFunctionName.EXPLAIN_TASK,
		parameters: {
			additionalProperties: false,
			properties: {
				context: {
					description:
						"Context explaining the user's need for a detailed explanation of the task.",
					type: "string",
				},
				instructions: {
					additionalProperties: false,
					properties: {
						action: {
							description:
								"Steps the assistant should take (e.g., explain the task, provide motivation, describe the steps for completion)",
							type: "string",
						},
						task: {
							description:
								"The main task for the assistant (e.g., provide an explanation and detailed breakdown of the task)",
							type: "string",
						},
					},
					required: ["task", "action"],
					type: "object",
				},
				response_structure: {
					additionalProperties: false,
					description: "Structure of the expected response",
					properties: {
						explanation: {
							description:
								"A detailed explanation of the task and how it aligns with the user's goals",
							type: "string",
						},
						message: {
							description: "A message summarizing the explanation of the task",
							type: "string",
						},
						motivation_tips: {
							description:
								"Tips to help the user stay motivated while completing the task",
							type: "string",
						},
						steps: {
							description:
								"An array of actionable steps the user should take to complete the task",
							type: "string",
						},
					},
					required: ["message", "explanation", "steps", "motivation_tips"],
					type: "object",
				},
				task: {
					additionalProperties: false,
					description:
						"Details about the task the user is asking for an explanation for.",
					properties: {
						categoryId: {
							description: "Unique identifier for the category",
							type: "number",
						},
						categoryName: {
							description: "The name of the category (e.g., Health, Work)",
							type: "string",
						},
						description: {
							description: "Description of the task that needs to be explained",
							type: "string",
						},
						dueDate: {
							description: "Due date of the task",
							type: "string",
						},
						label: {
							description: "Label or name of the task",
							type: "string",
						},
					},
					required: [
						"categoryId",
						"categoryName",
						"description",
						"dueDate",
						"label",
					],
					type: "object",
				},
			},
			required: ["context", "response_structure", "instructions", "task"],
			type: "object",
		},
		strict: true,
	},
	type: "function",
} as const;

export { ExplainTaskTool };
