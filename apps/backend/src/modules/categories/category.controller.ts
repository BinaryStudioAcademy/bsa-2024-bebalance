import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserDto } from "../users/users.js";
import { type CategoryService } from "./category.service.js";
import { CategoriesApiPath } from "./libs/enums/enums.js";
import { type QuizScoresUpdateRequestDto } from "./libs/types/types.js";

class CategoryController extends BaseController {
	private categoryService: CategoryService;

	public constructor(logger: Logger, categoryService: CategoryService) {
		super(logger, APIPath.CATEGORIES);

		this.categoryService = categoryService;

		this.addRoute({
			handler: (options) =>
				this.updateScores(
					options as APIHandlerOptions<{
						body: QuizScoresUpdateRequestDto;
						user: UserDto;
					}>,
				),
			method: "PATCH",
			path: CategoriesApiPath.SCORE,
		});
	}

	private async updateScores(
		options: APIHandlerOptions<{
			body: QuizScoresUpdateRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.categoryService.updateScores(
				options.body,
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}
}

export { CategoryController };
