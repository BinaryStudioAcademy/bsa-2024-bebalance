const AnalyzeBalanceScoresTool = {
	function: {
		description:
			"Analyzes user's life balance scores and identifies the three lowest categories with suggestions for improvement.",
		name: "analyze_balance_scores",
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
								type: "number",
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
						comments: {
							description:
								"A summary of the balance analysis and the identified areas for improvement.",
							type: "string",
						},
						greeting: {
							description:
								"A personalized greeting for the user based on their name, e.g., 'Hello, John!'",
							type: "string",
						},
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
						question: {
							description:
								"A follow-up question that guides the user to either focus on improving the three areas with the lowest scores or allows them to choose the areas for further improvement. The question should be crafted to encourage thoughtful reflection and engagement, and it must include the user's name.",
							type: "string",
						},
					},
					required: ["greeting", "comments", "lowestCategories", "question"],
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

export { AnalyzeBalanceScoresTool };
