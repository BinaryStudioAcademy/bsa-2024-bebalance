import { OpenAIFunctionName } from "../enums/open-ai-function-name.enum.js";

const AnalyzeBalanceTool = {
	function: {
		description:
			"Analyzes user's life balance scores and identifies the three lowest categories with suggestions for improvement.",
		name: OpenAIFunctionName.ANALYZE_BALANCE_SCORES,
		parameters: {
			additionalProperties: false,
			properties: {
				categories: {
					description: "Array of categories with user scores",
					items: {
						additionalProperties: false,
						properties: {
							categoryId: {
								description: "Unique identifier for the category",
								type: "string",
							},
							categoryName: {
								description: "The name of the category (e.g., Health, Work)",
								type: "string",
							},
							score: {
								description: "The user's score for this category, from 1 to 10",
								type: "number",
							},
						},
						required: ["categoryId", "categoryName", "score"],
						type: "object",
					},
					type: "array",
				},
				context: {
					description: "Context explaining the purpose of the analysis",
					type: "string",
				},
				instructions: {
					additionalProperties: false,
					properties: {
						action: {
							description:
								"What the assistant should do after identifying the categories (e.g., provide improvement suggestions)",
							type: "string",
						},
						task: {
							description:
								"The main task for the assistant (e.g., identify the lowest categories)",
							type: "string",
						},
					},
					required: ["task", "action"],
					type: "object",
				},
				response_structure: {
					additionalProperties: false,
					properties: {
						lowestCategories: {
							description:
								"An array of the three categories where the user scored the lowest, including category ID, name, and score.",
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
								},
								required: ["categoryId", "categoryName"],
								type: "object",
							},
							type: "array",
						},
						messages: {
							additionalProperties: false,
							description: "An array of messages summarizing the analysis.",
							properties: {
								comments: {
									description:
										"Summary of the balance analysis with identified areas for improvement.",
									type: "string",
								},
								greeting: {
									description: "A personalized greeting for the user.",
									type: "string",
								},
								question: {
									description:
										"A follow-up question that prompts the user to engage further with the suggested improvements.",
									type: "string",
								},
							},
							required: ["greeting", "comments", "question"],
							type: "object",
						},
					},
					required: ["messages", "lowestCategories"],
					type: "object",
				},
			},
			required: ["context", "categories", "instructions", "response_structure"],
			type: "object",
		},
		strict: true,
	},
	type: "function",
} as const;

export { AnalyzeBalanceTool };
