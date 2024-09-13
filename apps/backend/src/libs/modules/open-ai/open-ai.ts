import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { OpenAi } from "./open-ai.module.js";

const openAi = new OpenAi({
	config,
	logger,
});

await openAi.initializeAssistant();

export { openAi };
export {
	OpenAiFunctionName,
	OpenAiPromptTemplates,
	OpenAiRoleKey,
} from "./libs/enums/enums.js";
export {
	type OpenAiRequestMessage,
	type OpenAiResponseMessage,
	type OpenAiRunThreadRequestDto,
} from "./libs/types/types.js";
export { AiAssistantMessageValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { type OpenAi } from "./open-ai.module.js";
