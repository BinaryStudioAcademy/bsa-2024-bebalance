import { z } from "zod";

const explainTasks = z.object({
	message: z.string(),
	tasks: z.array(
		z.object({
			categoryId: z.number(),
			categoryName: z.string(),
			description: z.string(),
			explanation: z.string(),
			label: z.string(),
		}),
	),
});

export { explainTasks };
