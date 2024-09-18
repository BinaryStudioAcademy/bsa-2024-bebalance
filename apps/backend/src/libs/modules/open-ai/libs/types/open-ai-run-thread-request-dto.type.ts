import { type MessageCreateParams } from "openai/resources/beta/threads/index";
import { type ZodSchema } from "zod";

import { type OpenAiFunctionName } from "~/libs/modules/open-ai/open-ai.js";
import { type ValueOf } from "~/libs/types/types.js";

type OpenAiRunThreadRequestDto = {
	additional_instructions: null | string;
	function_name: ValueOf<typeof OpenAiFunctionName>;
	instructions: null | string;
	messages: MessageCreateParams[];
	validationSchema: ZodSchema;
};

export { type OpenAiRunThreadRequestDto };
