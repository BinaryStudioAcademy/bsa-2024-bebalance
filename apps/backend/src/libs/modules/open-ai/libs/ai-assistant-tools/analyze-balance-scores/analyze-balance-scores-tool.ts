const AnalyzeBalanceScores = {
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
			},
			required: ["context", "categories", "instructions"],
			type: "object",
		},
		strict: true,
	},
	type: "function",
} as const;

export { AnalyzeBalanceScores };
