import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { OnboardingApiPath } from "./libs/enums/enums.js";
import { type UserDto } from "./libs/types/types.js";
import { type OnboardingService } from "./onboarding.service.js";

class OnboardingController extends BaseController {
	private onboardingService: OnboardingService;

	public constructor(logger: Logger, onboardingService: OnboardingService) {
		super(logger, APIPath.ONBOARDING);

		this.onboardingService = onboardingService;

		this.addRoute({
			handler: (options) =>
				this.saveOnboardingAnswers(
					options as APIHandlerOptions<{
						body: { answerIds: number[] };
						user: UserDto;
					}>,
				),
			method: "POST",
			path: OnboardingApiPath.ANSWER,
		});
	}

	/**
	 * @swagger
	 * /onboarding/answer:
	 *   put:
	 *     description: Saves user answers for onboarding questions at once
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               answerIds:
	 *                 type: number[]
	 *
	 *
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 isAnswerStored:
	 *                   type: boolean
	 *                 isPreviousAnswerDeleted:
	 *                   type: boolean
	 *                 answer:
	 *                   type: object
	 *                   properties:
	 *                     createdAt:
	 *                       type: string
	 *                     id:
	 *                       type: number
	 *                     label:
	 *                       type: string
	 *                     questionId:
	 *                       type: number
	 *                     updatedAt:
	 *                       type: string
	 */
	private async saveOnboardingAnswers(
		options: APIHandlerOptions<{
			body: { answerIds: number[] };
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { answerIds } = options.body;

		return {
			payload: await this.onboardingService.create({
				answerIds,
				userId: options.user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { OnboardingController };
