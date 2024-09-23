import { z } from "zod";

const openAIAssistantMessage = z.object({
	content: z
		.array(
			z.object({
				text: z.object({
					value: z.string(),
				}),
				type: z.literal("text"),
			}),
		)
		.nonempty(),
	id: z.string(),
});

export { openAIAssistantMessage };
