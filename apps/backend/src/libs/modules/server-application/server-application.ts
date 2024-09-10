import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { aiAssistantController } from "~/modules/ai-assistant/ai-assistant.js";
import { authController } from "~/modules/auth/auth.js";
import { onboardingController } from "~/modules/onboarding/onboarding.js";
import { quizController } from "~/modules/quiz/quiz.js";
import { taskController } from "~/modules/tasks/tasks.js";
import { userController } from "~/modules/users/users.js";

import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...userController.routes,
	...onboardingController.routes,
	...quizController.routes,
	...aiAssistantController.routes,
	...taskController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	title: "BeBalance",
});

export { serverApplication };
export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
