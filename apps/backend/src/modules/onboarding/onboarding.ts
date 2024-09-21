import { logger } from "~/libs/modules/logger/logger.js";

import { OnboardingController } from "./onboarding.controller.js";
import { OnboardingRepository } from "./onboarding.repository.js";
import { OnboardingService } from "./onboarding.service.js";
import { OnboardingAnswerModel } from "./onboarding-answer.model.js";
import { OnboardingQuestionModel } from "./onboarding-question.model.js";

const onboardingRepository = new OnboardingRepository(
	OnboardingAnswerModel,
	OnboardingQuestionModel,
);
const onboardingService = new OnboardingService(onboardingRepository);
const onboardingController = new OnboardingController(
	logger,
	onboardingService,
);

export { OnboardingApiPath } from "./libs/enums/enums.js";
export { OnboardingError } from "./libs/exceptions/exceptions.js";
export { type OnboardingRepository } from "./onboarding.repository.js";
export { onboardingController };
export { onboardingRepository };
export { OnboardingAnswerEntity } from "./onboarding-answer.entity.js";
export { OnboardingAnswerModel } from "./onboarding-answer.model.js";
export { OnboardingQuestionEntity } from "./onboarding-question.entity.js";
