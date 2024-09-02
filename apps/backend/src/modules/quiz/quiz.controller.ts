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
	type QuizCategoryDto,
	type QuizGetAllCategoriesResponseDto,
} from "../categories/categories.js";
import {
	type QuizAnswerService,
	type QuizAnswersRequestDto,
} from "../quiz-answers/quiz-answers.js";
import { type UserDto } from "../users/users.js";
import { QuizApiPath } from "./libs/enums/enums.js";
import { quizUserAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

type Constructor = {
	categoryService: CategoryService;
	logger: Logger;
	quizAnswerService: QuizAnswerService;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         name:
 *           type: string
 *           example: "Physical"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UserScore:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: number
 *           format: int64
 *         createdAt:
 *           type: string
 *           format: date-time
 *         score:
 *           type: number
 *           format: float
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: number
 *           format: int64
 *     UserAnswer:
 *       type: object
 *       properties:
 *         answerId:
 *           type: number
 *           format: int64
 *         createdAt:
 *           type: string
 *           format: date-time
 *         id:
 *           type: number
 *           format: int64
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: number
 *           format: int64
 */
class QuizController extends BaseController {
	private categoryService: CategoryService;
	private quizAnswerService: QuizAnswerService;

	constructor({ categoryService, logger, quizAnswerService }: Constructor) {
		super(logger, APIPath.QUIZ);

		this.categoryService = categoryService;
		this.quizAnswerService = quizAnswerService;

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
			handler: () => this.getCategories(),
			method: "GET",
			path: QuizApiPath.CATEGORIES,
		});
	}

	/**
	 * @swagger
	 * /quiz/answer:
	 *   post:
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

	/**
	 * @swagger
	 * /quiz/categories:
	 *   get:
	 *     description: Returns an array of quiz categories
	 *     security:
	 *       - bearerAuth: []
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
	 *                     $ref: "#/components/schemas/QuizCategory"
	 */
	private async getCategories(): Promise<
		APIHandlerResponse<QuizGetAllCategoriesResponseDto>
	> {
		const categories = await this.categoryService.findAll();

		const items: QuizCategoryDto[] = categories.items.map((category) => {
			const { createdAt, id, name, updatedAt } = category;

			return { createdAt, id, name, updatedAt };
		});

		return { payload: { items }, status: HTTPCode.OK };
	}
}

export { QuizController };
