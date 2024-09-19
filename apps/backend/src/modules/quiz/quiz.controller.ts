import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	type CategoryService,
	type QuizScoresUpdateRequestDto,
	updateScoresValidationSchema,
} from "../categories/categories.js";
import {
	type QuizAnswerService,
	type QuizAnswersRequestDto,
} from "../quiz-answers/quiz-answers.js";
import { type QuizQuestionService } from "../quiz-questions/quiz-questions.js";
import { type UserDto } from "../users/users.js";
import { QuizApiPath } from "./libs/enums/enums.js";
import { type CategoriesGetRequestQueryDto } from "./libs/types/types.js";
import {
	categoryIdsValidationSchema,
	quizUserAnswersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

type Constructor = {
	categoryService: CategoryService;
	logger: Logger;
	quizAnswerService: QuizAnswerService;
	quizQuestionService: QuizQuestionService;
};

/**
 * @swagger
 * tags:
 *   - name: quiz
 *     description: Endpoints related to quiz
 * components:
 *   schemas:
 *     QuizQuestionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         label:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuizAnswerDto"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizAnswerDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         questionId:
 *           type: integer
 *           example: 1
 *         label:
 *           type: string
 *         value:
 *           type: number
 *         userAnswers:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuizUserAnswerDto"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizUserAnswerDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         answerId:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizGetAllScoresResponseDto:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             allOf:
 *               - type: object
 *                 properties:
 *                   categoryName:
 *                     type: string
 *                     example: "Physical"
 *               - $ref: "#/components/schemas/QuizScoreDto"
 *     QuizScoreDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         score:
 *           type: number
 *           format: float
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class QuizController extends BaseController {
	private categoryService: CategoryService;

	private quizAnswerService: QuizAnswerService;

	private quizQuestionService: QuizQuestionService;

	public constructor({
		categoryService,
		logger,
		quizAnswerService,
		quizQuestionService,
	}: Constructor) {
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
			handler: (options) =>
				this.findQuestions(
					options as APIHandlerOptions<{
						query: CategoriesGetRequestQueryDto;
					}>,
				),
			method: "GET",
			path: QuizApiPath.QUESTIONS,
			validation: {
				query: categoryIdsValidationSchema,
			},
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

		this.addRoute({
			handler: (options) =>
				this.updateUserScores(
					options as APIHandlerOptions<{
						body: QuizScoresUpdateRequestDto;
						user: UserDto;
					}>,
				),
			method: "PATCH",
			path: QuizApiPath.SCORE,
			validation: {
				body: updateScoresValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /quiz/answer:
	 *   post:
	 *     tags: [quiz]
	 *     summary: Saves user quiz answers
	 *     description: Saves user answers for all quiz questions at once
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
	 *                     $ref: "#/components/schemas/QuizScoreDto"
	 *                 userAnswers:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/QuizUserAnswerDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
	 */
	private async createUserAnswers(
		options: APIHandlerOptions<{
			body: QuizAnswersRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { answerIds } = options.body;
		const categoryIds = options.body.categoryIds as number[];

		return {
			payload: await this.quizAnswerService.createUserAnswers({
				answerIds,
				categoryIds,
				userId: options.user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /quiz/questions:
	 *   get:
	 *     tags: [quiz]
	 *     summary: Get quiz questions
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: query
	 *         name: categoryIds
	 *         required: false  # Optional parameter
	 *         description: Array of category IDs to filter the quiz questions (optional)
	 *         schema:
	 *           type: string
	 *         example: "[3, 6]"
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 items:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/QuizQuestionDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */

	private async findQuestions(
		options: APIHandlerOptions<{ query: CategoriesGetRequestQueryDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizQuestionService.findQuestions(options.query),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /quiz/score:
	 *   get:
	 *     tags: [quiz]
	 *     summary: Get user scores on quiz
	 *     description: Returns all user scores
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/QuizGetAllScoresResponseDto"
	 */
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

	/**
	 * @swagger
	 * /quiz/score:
	 *   patch:
	 *     tags: [quiz]
	 *     summary: Partially update user scores on each category
	 *     description: Updates multiple or single user scores
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               items:
	 *                 type: array
	 *                 items:
	 *                   type: object
	 *                   properties:
	 *                     categoryId:
	 *                       type: number
	 *                     score:
	 *                       type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 items:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/QuizScoreDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
	 */
	private async updateUserScores(
		options: APIHandlerOptions<{
			body: QuizScoresUpdateRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.updateUserScores(
				options.body,
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
