import { OpenAIFunctionName } from "../enums/open-ai-function-name.enum.js";

const ExplainTasksTool = {
	function: {
		description:
			"Provides explanations for the tasks, including how they align with the user's goals.",
		name: OpenAIFunctionName.EXPLAIN_TASKS,
		parameters: {
			additionalProperties: false,
			properties: {
				context: {
					description:
						"Retrieve and analyze the user's onboarding quiz responses and prioritize tasks explanations based on user's answers.",
					type: "string",
				},
				instructions: {
					additionalProperties: false,
					properties: {
						action: {
							description:
								"Instructions for generating task explanations based on the user's quiz answers.",
							type: "string",
						},
						task: {
							description:
								"Explain the task and show how it aligns with the user's goals from their onboarding quiz",
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
						message: {
							description:
								"A message summarizing the tasks and their explanations",
							type: "string",
						},
						tasks: {
							additionalProperties: false,
							description:
								"An array of new tasks generated for the category and their explanations",
							items: {
								additionalProperties: false,
								properties: {
									categoryId: {
										description: "Unique identifier for the category",
										type: "number",
									},
									categoryName: {
										description: "The name of the category",
										type: "string",
									},
									description: {
										description: "Detailed description of the new task",
										type: "string",
									},
									explanation: {
										description:
											"An explanation of the task and how it aligns with the user's goals",
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
									"label",
									"explanation",
								],
								type: "object",
							},
							type: "array",
						},
					},
					required: ["message", "tasks"],
					type: "object",
				},
				tasks: {
					additionalProperties: false,
					description:
						"Details of the tasks that the user is asking for explanations about..",
					items: {
						additionalProperties: false,
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
								description: "Description of the previously suggested task",
								type: "string",
							},
							dueDate: {
								description: "Due date of the previously suggested task",
								type: "string",
							},
							label: {
								description: "Label or name of the previously suggested task",
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
					type: "array",
				},
			},
			required: ["context", "response_structure", "instructions", "tasks"],
			type: "object",
		},
		strict: true,
	},
	type: "function",
} as const;

export { ExplainTasksTool };
