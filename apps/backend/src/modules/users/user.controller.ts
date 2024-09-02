import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserDto,
	type UserPreferencesRequestDto,
} from "./libs/types/types.js";
import { userPreferencesValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/*** @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 *          name:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */

class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);

		this.userService = userService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: UsersApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.setUserPreferences(
					options as APIHandlerOptions<{
						body: UserPreferencesRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: UsersApiPath.FINAL_QUESTIONS,
			validation: {
				body: userPreferencesValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Returns an array of users
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  items:
	 *                    type: array
	 *                    items:
	 *                      $ref: "#/components/schemas/User"
	 */

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/final-questions:
	 *    post:
	 *      description: Save user preferences based on final questions form
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: "#/components/schemas/FinalQuestionsRequest"
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/User"
	 */

	private async setUserPreferences(
		options: APIHandlerOptions<{
			body: UserPreferencesRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { allowNotifications, userId, userTaskDays } = options.body;

		if (!userId) {
			return {
				payload: { message: "User ID is required" },
				status: HTTPCode.BAD_REQUEST,
			};
		}

		const updatedUserDto = await this.userService.setUserPreferences(userId, {
			allowNotifications,
			userTaskDays,
		});

		return {
			payload: updatedUserDto,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
