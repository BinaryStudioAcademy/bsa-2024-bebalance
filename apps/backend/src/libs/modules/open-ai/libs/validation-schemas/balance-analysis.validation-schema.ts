import { z } from "zod";

const Category = z.object({
	categoryId: z.string(),
	categoryName: z.string(),
	score: z.number(),
});

const BalanceAnalysis = z.object({
	answer: z.string(),
	lowestCategories: z.array(Category),
});

export { BalanceAnalysis };
