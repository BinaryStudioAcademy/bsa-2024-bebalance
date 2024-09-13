import { z } from "zod";

const Task = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
	description: z.string(),
	dueDate: z.string(),
	label: z.string(),
});

const TaskByCategory = z.object({
	message: z.string(),
	tasks: z.array(Task),
});

export { TaskByCategory };
