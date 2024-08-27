import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { SurveyApiPath } from "./libs/enums/enums.js";
import { type SurveyService } from "./survey.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     OnboardingAnswer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the answer.
 *           example: 1
 *         label:
 *           type: string
 *           description: The text of the answer.
 *           example: "Yes"
 *         questionId:
 *           type: integer
 *           description: The ID of the question this answer belongs to.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the answer.
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the answer.
 *           example: "2020-01-01T00:00:00.000Z"
 *     OnboardingQuestion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the question.
 *           example: 1
 *         label:
 *           type: string
 *           description: The text of the question.
 *           example: "Do you like this survey?"
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OnboardingAnswer'
 *           description: The list of possible answers for this question.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the question.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the question.
 */

class SurveyController extends BaseController {
	private surveyService: SurveyService;

	public constructor(logger: Logger, surveyService: SurveyService) {
		super(logger, APIPath.SURVEYS);

		this.surveyService = surveyService;

		this.addRoute({
			handler: () => this.getOnboardingQuestions(),
			method: "GET",
			path: SurveyApiPath.ONBOARDING,
		});
	}

	/**
	 * @swagger
	 * tags:
	 *   - name: Surveys
	 *     description: Endpoints related to surveys
	 */

	/**
	 * @swagger
	 * /surveys/onboarding:
	 *   get:
	 *     tags:
	 *       - Surveys
	 *     summary: Get onboarding questions
	 *     description: Returns an array of onboarding questions with possible answers.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/OnboardingQuestion"
	 */
	private async getOnboardingQuestions(): Promise<APIHandlerResponse> {
		return {
			payload: await this.surveyService.getOnboardingSurvey(),
			status: HTTPCode.OK,
		};
	}
}

export { SurveyController };
