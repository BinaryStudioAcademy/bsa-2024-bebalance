import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type QuizAnswerService } from "../quiz-answers/quiz-answers.js";
import { APIPath, QuizApiPath } from "./libs/enums/enums.js";
import { type UserDto } from "./libs/types/types.js";

class QuizController extends BaseController {
	private quizAnswerService: QuizAnswerService;

	public constructor(logger: Logger, quizAnswerService: QuizAnswerService) {
		super(logger, APIPath.QUIZ);

		this.quizAnswerService = quizAnswerService;

		this.addRoute({
			handler: (options) =>
				this.createUserAnswer(
					options as APIHandlerOptions<{
						body: { answerId: number };
						user: UserDto;
					}>,
				),
			method: "PUT",
			path: QuizApiPath.ANSWER,
		});
	}

	/**
	 * @swagger
	 * /quiz/answer:
	 *   put:
	 *     description: Create a user answer and remove previous answer to the same question
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               answerId:
	 *                 type: number
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
			body: { answerId: number };
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizAnswerService.createUserAnswer({
				answerId: options.body.answerId,
				userId: options.user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
