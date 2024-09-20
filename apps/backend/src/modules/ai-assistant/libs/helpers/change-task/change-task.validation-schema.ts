import { z } from "zod";

const changeTaskByCategory = z.object({
	message: z.string(),
	tasks: z.object({
		categoryId: z.number(),
		categoryName: z.string(),
		description: z.string(),
		label: z.string(),
	}),
});

export { changeTaskByCategory };
