import { logger } from "~/libs/modules/logger/logger.js";
import { openAI } from "~/libs/modules/open-ai/open-ai.js";
import { categoryService } from "~/modules/categories/categories.js";
import { onboardingRepository } from "~/modules/onboarding/onboarding.js";
import { taskService } from "~/modules/tasks/tasks.js";

import { AIAssistantController } from "./ai-assistant.controller.js";
import { AIAssistantService } from "./ai-assistant.service.js";

const aiAssistantService = new AIAssistantService({
	categoryService,
	onboardingRepository,
	openAI,
	taskService,
});

const aiAssistantController = new AIAssistantController(
	logger,
	aiAssistantService,
);

export { aiAssistantController };
