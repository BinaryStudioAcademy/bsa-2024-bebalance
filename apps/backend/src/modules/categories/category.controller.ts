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
import { type CategoriesGetRequestQueryDto } from "./libs/types/types.js";
import { categoryIdsValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
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
			handler: (options) =>
				this.getCategories(
					options as APIHandlerOptions<{
						query: CategoriesGetRequestQueryDto;
					}>,
				),
			method: "GET",
			path: CategoriesApiPath.ROOT,
			validation: {
				query: categoryIdsValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * tags:
	 *   - name: Categories
	 *     description: Endpoints related to categories
	 */

	/**
	 * @swagger
	 * /categories:
	 *   get:
	 *     tags:
	 *       - Categories
	 *     summary: Returns Categories
	 *     description: Returns an array of quiz categories. If provided with a query, returns categories with IDs specified in the query; otherwise, returns all categories.
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: query
	 *         name: categoryIds
	 *         required: false
	 *         description: Stringified array of category IDs.
	 *         schema:
	 *           type: string
	 *           example: "[1,2,3]"
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

	private async getCategories(
		options: APIHandlerOptions<{
			query: CategoriesGetRequestQueryDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.findCategories(options.query),
			status: HTTPCode.OK,
		};
	}
}

export { CategoryController };
