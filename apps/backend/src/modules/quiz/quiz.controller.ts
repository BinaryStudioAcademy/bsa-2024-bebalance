import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CategoryService } from "../categories/categories.js";
import {
	type QuizAnswerService,
	type QuizAnswersRequestDto,
} from "../quiz-answers/quiz-answers.js";
import { type QuizQuestionService } from "../quiz-questions/quiz-questions.js";
import { type UserDto } from "../users/users.js";
import { QuizApiPath } from "./libs/enums/enums.js";
import { quizUserAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/*** @swagger
 * components:
 *    schemas:
 *      UserScore:
 *        type: object
 *        properties:
 *          categoryId:
 *            type: number
 *            format: int64
 *          createdAt:
 *            type: string
 *            format: date-time
 *          score:
 *            type: number
 *            format: float
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          userId:
 *            type: number
 *            format: int64
 *      UserAnswer:
 *        type: object
 *        properties:
 *          answerId:
 *            type: number
 *            format: int64
 *          createdAt:
 *            type: string
 *            format: date-time
 *          id:
 *            type: number
 *            format: int64
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          userId:
 *            type: number
 *            format: int64
 */
class QuizController extends BaseController {
	private categoryService: CategoryService;

	private quizAnswerService: QuizAnswerService;

	private quizQuestionService: QuizQuestionService;

	public constructor(options: {
		categoryService: CategoryService;
		logger: Logger;
		quizAnswerService: QuizAnswerService;
		quizQuestionService: QuizQuestionService;
	}) {
		const { categoryService, logger, quizAnswerService, quizQuestionService } =
			options;
		super(logger, APIPath.QUIZ);

		this.categoryService = categoryService;

		this.quizAnswerService = quizAnswerService;

		this.quizQuestionService = quizQuestionService;

		this.addRoute({
			handler: (options) =>
				this.createUserAnswers(
					options as APIHandlerOptions<{
						body: QuizAnswersRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: QuizApiPath.ANSWER,
			validation: {
				body: quizUserAnswersValidationSchema,
			},
		});

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: QuizApiPath.QUESTIONS,
		});

		this.addRoute({
			handler: (options) =>
				this.findUserScores(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "GET",
			path: QuizApiPath.SCORE,
		});
	}

	/**
	 * @swagger
	 * /quiz/answer:
	 *   post:
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
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 scores:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/UserScore"
	 *                 userAnswers:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/UserAnswer"
	 */
	private async createUserAnswers(
		options: APIHandlerOptions<{
			body: QuizAnswersRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { answerIds } = options.body;

		return {
			payload: await this.quizAnswerService.createUserAnswers({
				answerIds,
				userId: options.user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizQuestionService.findAll(),
			status: HTTPCode.OK,
		};
	}

	private async findUserScores(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.findUserScores(options.user.id),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
