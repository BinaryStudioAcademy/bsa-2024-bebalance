import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type QuizQuestionsService } from "~/modules/quiz/quiz.service.js";

import { QuizApiPath } from "./libs/enums/enums.js";

/*** @swagger
 * components:
 *    schemas:
 *      Quiz Questions:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          label:
 *            type: string
 *            format: email
 *          categoryId:
 *            type: number
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
class QuizController extends BaseController {
	private quizQuestionsService: QuizQuestionsService;

	public constructor(
		logger: Logger,
		quizQuestionsService: QuizQuestionsService,
	) {
		super(logger, APIPath.QUIZ);

		this.quizQuestionsService = quizQuestionsService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: QuizApiPath.QUESTION,
		});
	}

	/**
	 * @swagger
	 * /quiz/questions:
	 *    get:
	 *      description: Returns an array of questions
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *
	 */

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizQuestionsService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
