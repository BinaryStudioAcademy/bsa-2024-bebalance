import { z } from "zod";

const changeTasksByCategory = z.object({
	message: z.string(),
	tasks: z.array(
		z.object({
			categoryId: z.number(),
			categoryName: z.string(),
			description: z.string(),
			label: z.string(),
		}),
	),
});

export { changeTasksByCategory };
