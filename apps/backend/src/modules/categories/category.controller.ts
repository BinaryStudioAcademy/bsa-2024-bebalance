import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CategoryService } from "./category.service.js";
import { CategoriesApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: categories
 *     description: Endpoints related to categories
 * components:
 *   schemas:
 *     CategoryDto:
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
 */
class CategoryController extends BaseController {
	private categoryService: CategoryService;

	public constructor(logger: Logger, categoryService: CategoryService) {
		super(logger, APIPath.CATEGORIES);

		this.categoryService = categoryService;

		this.addRoute({
			handler: () => this.getCategories(),
			method: "GET",
			path: CategoriesApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /categories:
	 *   get:
	 *     tags: [categories]
	 *     summary: Get all categories
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
	 *                     $ref: "#/components/schemas/CategoryDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async getCategories(): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { CategoryController };
