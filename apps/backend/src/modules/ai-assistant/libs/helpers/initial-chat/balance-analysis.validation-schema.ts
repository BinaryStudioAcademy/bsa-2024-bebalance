import { z } from "zod";

const category = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
});

const messages = z.object({
	comments: z.string(),
	greeting: z.string(),
	question: z.string(),
});

const balanceAnalysis = z.object({
	lowestCategories: z.array(category),
	messages,
});

export { balanceAnalysis };
