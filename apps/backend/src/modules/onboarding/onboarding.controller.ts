import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserDto } from "~/modules/users/users.js";

import { OnboardingApiPath } from "./libs/enums/enums.js";
import { type OnboardingAnswerRequestBodyDto } from "./libs/types/types.js";
import { onboardingAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type OnboardingService } from "./onboarding.service.js";

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

class OnboardingController extends BaseController {
	private onboardingService: OnboardingService;

	public constructor(logger: Logger, onboardingService: OnboardingService) {
		super(logger, APIPath.ONBOARDING);

		this.onboardingService = onboardingService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: OnboardingApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.saveOnboardingAnswers(
					options as APIHandlerOptions<{
						body: OnboardingAnswerRequestBodyDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: OnboardingApiPath.ANSWER,
			validation: {
				body: onboardingAnswersValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * tags:
	 *   - name: Onboarding
	 *     description: Endpoints related to onboarding
	 */

	/**
	 * @swagger
	 * /onboarding:
	 *   get:
	 *     tags:
	 *       - Onboarding
	 *     summary: Get onboarding questions
	 *     description: Returns an array of onboarding questions with possible answers.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *             application/json:
	 *               schema:
	 *                 type: object
	 *                 properties:
	 *                   items:
	 *                     type: array
	 *                     items:
	 *                      $ref: "#/components/schemas/OnboardingQuestion"
	 *
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.onboardingService.findAll(),
			status: HTTPCode.OK,
		};
	}
	/**
	 * @swagger
	 * /onboarding/answer:
	 *   post:
	 *     tags:
	 *       - Onboarding
	 *     description: Saves user answers for onboarding questions
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               answerIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *               user:
	 *                 type: object
	 *                 properties:
	 *                   id:
	 *                     type: number
	 *                   email:
	 *                     type: string
	 *     responses:
	 *       201:
	 *         description: Answers successfully saved
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 addedAnswers:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     properties:
	 *                       id:
	 *                         type: number
	 *                       label:
	 *                         type: string
	 *                       questionId:
	 *                         type: number
	 *                       createdAt:
	 *                         type: string
	 *                         format: date-time
	 *                       updatedAt:
	 *                         type: string
	 *                         format: date-time
	 */
	private async saveOnboardingAnswers(
		options: APIHandlerOptions<{
			body: OnboardingAnswerRequestBodyDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { answerIds } = options.body;

		return {
			payload: await this.onboardingService.createAnswer({
				answerIds,
				userId: options.user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}
}

export { OnboardingController };
