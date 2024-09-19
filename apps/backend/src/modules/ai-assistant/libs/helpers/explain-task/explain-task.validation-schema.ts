import { z } from "zod";

const explainTask = z.object({
	message: z.object({
		explanation: z.string(),
		motivation_tips: z.string(),
		question: z.string(),
		steps: z.string(),
		suggestions: z.string(),
	}),
});

export { explainTask };
