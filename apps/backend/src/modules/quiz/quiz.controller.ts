import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type QuizAnswerService } from "../quiz-answers/quiz-answers.js";
import { QuizApiPath } from "./libs/enums/enums.js";
import { type UserDto } from "./libs/types/types.js";
import { quizUserAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class QuizController extends BaseController {
	private quizAnswerService: QuizAnswerService;

	public constructor(logger: Logger, quizAnswerService: QuizAnswerService) {
		super(logger, APIPath.QUIZ);

		this.quizAnswerService = quizAnswerService;

		this.addRoute({
			handler: (options) =>
				this.createUserAnswer(
					options as APIHandlerOptions<{
						body: { answerIds: number[] };
						user: UserDto;
					}>,
				),
			method: "PUT",
			path: QuizApiPath.ANSWER,
			validation: {
				body: quizUserAnswersValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /quiz/answer:
	 *   put:
	 *     description: Saves user answers for all quiz questions at once
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
	 *                     value:
	 *                       type: number
	 */
	private async createUserAnswer(
		options: APIHandlerOptions<{
			body: { answerIds: number[] };
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { answerIds } = options.body;

		return {
			payload: await this.quizAnswerService.createUserAnswers({
				answerIds,
				userId: options.user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
