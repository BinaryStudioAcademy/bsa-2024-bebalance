import { OpenAIFunctionName } from "../enums/open-ai-function-name.enum.js";

const ChangeTasksTool = {
	function: {
		description:
			"Generates a new task for the category based on the user's request, ensuring it doesn't repeat previously suggested tasks and takes into account the user's onboarding quiz priorities.",
		name: OpenAIFunctionName.CHANGE_TASKS,
		parameters: {
			additionalProperties: false,
			properties: {
				context: {
					description: "Context explaining the user's need other task",
					type: "string",
				},
				instructions: {
					additionalProperties: false,
					properties: {
						action: {
							description:
								"The steps the assistant should take (e.g., generate tasks, provide descriptions, assign due dates)",
							type: "string",
						},
						task: {
							description:
								"The main task for the assistant (e.g., suggest actionable tasks for each category)",
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
							description: "A message summarizing the newly generated tasks",
							type: "string",
						},
						tasks: {
							additionalProperties: false,
							description: "An array of new tasks generated for the category",
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
						"Details about the tasks for which the user is requesting new tasks.",
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
							label: {
								description: "Label or name of the previously suggested task",
								type: "string",
							},
						},
						required: ["categoryId", "categoryName", "description", "label"],
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

export { ChangeTasksTool };
