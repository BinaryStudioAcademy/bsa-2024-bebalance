import { OpenAIFunctionName } from "../enums/open-ai-function-name.enum.js";

const SuggestTaskTool = {
	function: {
		description:
			"Generates specific and actionable tasks for each user-selected category based on their onboarding responses.",
		name: OpenAIFunctionName.GENERATE_TASK_BY_CATEGORY,
		parameters: {
			additionalProperties: false,
			properties: {
				categories: {
					description:
						"Array of categories selected by the user for improvement",
					items: {
						additionalProperties: false,
						properties: {
							id: {
								description: "Unique identifier for the category",
								type: "number",
							},
							name: {
								description: "The name of the category (e.g., Health, Work)",
								type: "string",
							},
						},
						required: ["id", "name"],
						type: "object",
					},
					type: "array",
				},
				context: {
					description:
						"Context explaining the user's goals and the categories they've selected",
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
					properties: {
						message: {
							description: "A message summarizing the task suggestions",
							type: "string",
						},
						tasks: {
							description: "Array of tasks generated for each category",
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
										description: "Detailed description of the task",
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
			},
			required: ["categories", "context", "instructions", "response_structure"],
			type: "object",
		},
		strict: true,
	},
	type: "function",
} as const;

export { SuggestTaskTool };
