import { logger } from "~/libs/modules/logger/logger.js";

import { OnboardingAnswerModel } from "./onboarding/onboarding-answer.model.js";
import { OnboardingQuestionModel } from "./onboarding/onboarding-question.model.js";
import { SurveyController } from "./survey.controller.js";
import { SurveyRepository } from "./survey.repository.js";
import { SurveyService } from "./survey.service.js";

const surveyRepository = new SurveyRepository(
	OnboardingAnswerModel,
	OnboardingQuestionModel,
);
const surveyService = new SurveyService(surveyRepository);
const surveyController = new SurveyController(logger, surveyService);
export { SurveyApiPath } from "./libs/enums/enums.js";
export { surveyController };
