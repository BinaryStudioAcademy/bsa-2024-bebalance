import { z } from "zod";

const Category = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
});

const Messages = z.object({
	comments: z.string(),
	greeting: z.string(),
	question: z.string(),
});

const BalanceAnalysis = z.object({
	lowestCategories: z.array(Category),
	messages: Messages,
});

export { BalanceAnalysis };
