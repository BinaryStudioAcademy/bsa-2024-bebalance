import { z } from "zod";

const ChangeTaskByCategory = z.object({
	message: z.string(),
	task: z.object({
		categoryId: z.number(),
		categoryName: z.string(),
		description: z.string(),
		dueDate: z.string(),
		label: z.string(),
	}),
});

export { ChangeTaskByCategory };
