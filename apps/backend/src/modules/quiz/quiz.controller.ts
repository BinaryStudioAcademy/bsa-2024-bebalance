import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type QuizCategoryService } from "../quiz-category/quiz-category.js";
import { QuizApiPath } from "./libs/enums/enums.js";

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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class QuizController extends BaseController {
	private quizCatergoryService: QuizCategoryService;

	constructor(logger: Logger, quizCatergoryService: QuizCategoryService) {
		super(logger, APIPath.QUIZ);

		this.quizCatergoryService = quizCatergoryService;

		this.addRoute({
			handler: () => this.getCategories(),
			method: "GET",
			path: QuizApiPath.CATEGORIES,
		});
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
	private async getCategories(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizCatergoryService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
