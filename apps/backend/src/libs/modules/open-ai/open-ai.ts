import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { OpenAI } from "./open-ai.module.js";

const openAI = new OpenAI({
	config,
	logger,
});

await openAI.initializeAssistant();

export { openAI };
export {
	OpenAIErrorMessage,
	OpenAIFunctionName,
	OpenAIPromptTemplate,
	OpenAIRoleKey,
} from "./libs/enums/enums.js";
export {
	type OpenAIRequestMessage,
	type OpenAIResponseMessage,
	type OpenAIRunThreadRequestDto,
} from "./libs/types/types.js";
export { AIAssistantMessageValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { type OpenAI } from "./open-ai.module.js";
