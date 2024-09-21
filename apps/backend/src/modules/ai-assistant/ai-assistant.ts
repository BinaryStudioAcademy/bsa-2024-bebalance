import { logger } from "~/libs/modules/logger/logger.js";
import { openAI } from "~/libs/modules/open-ai/open-ai.js";
import { categoryService } from "~/modules/categories/categories.js";
import { chatMessageService } from "~/modules/chat-message/chat-messages.js";
import { onboardingRepository } from "~/modules/onboarding/onboarding.js";
import { taskService } from "~/modules/tasks/tasks.js";

import { AiAssistantController } from "./ai-assistant.controller.js";
import { AiAssistantService } from "./ai-assistant.service.js";

const aiAssistantService = new AiAssistantService({
	categoryService,
	chatMessageService,
	onboardingRepository,
	openAi: openAI,
	taskService,
});

const aiAssistantController = new AiAssistantController(
	logger,
	aiAssistantService,
);

export { aiAssistantController };
