import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CategoryService } from "./category.service.js";
import { CategoriesApiPath } from "./libs/enums/enums.js";
import { type CategoriesGetByIdRequestDto } from "./libs/types/types.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
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

		this.addRoute({
			handler: (options) =>
				this.getCategoriesById(
					options as APIHandlerOptions<{
						query: CategoriesGetByIdRequestDto;
					}>,
				),
			method: "GET",
			path: CategoriesApiPath.GET_BY_ID,
		});
	}

	/**
	 * @swagger
	 * /categories:
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
	 *                     $ref: "#/components/schemas/Category"
	 */
	private async getCategories(): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.findAll(),
			status: HTTPCode.OK,
		};
	}

	private async getCategoriesById(
		options: APIHandlerOptions<{
			query: CategoriesGetByIdRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.findById(options.query),
			status: HTTPCode.OK,
		};
	}
}

export { CategoryController };
