import { z } from "zod";

const Category = z.object({
	categoryId: z.string(),
	categoryName: z.string(),
	score: z.number(),
});

const Messages = z.object({
	comments: z.string(),
	greeting: z.string(),
});

const BalanceAnalysis = z.object({
	lowestCategories: z.array(Category),
	messages: Messages,
});

export { BalanceAnalysis };
