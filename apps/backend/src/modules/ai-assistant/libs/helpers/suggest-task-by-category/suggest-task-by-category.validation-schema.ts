import { z } from "zod";

const task = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
	description: z.string(),
	dueDate: z.string(),
	label: z.string(),
});

const taskByCategory = z.object({
	message: z.string(),
	tasks: z.array(task),
});

export { taskByCategory };
