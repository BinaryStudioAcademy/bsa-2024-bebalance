import { type MessageCreateParams } from "openai/resources/beta/threads/index";
import { type ZodSchema } from "zod";

import { type OpenAIFunctionName } from "~/libs/modules/open-ai/open-ai.js";
import { type ValueOf } from "~/libs/types/types.js";

type OpenAiRunThreadRequestDto = {
	additional_instructions: null | string;
	function_name: ValueOf<typeof OpenAIFunctionName>;
	instructions: null | string;
	messages: MessageCreateParams[];
	validationSchema: ZodSchema;
};

export { type OpenAiRunThreadRequestDto };
