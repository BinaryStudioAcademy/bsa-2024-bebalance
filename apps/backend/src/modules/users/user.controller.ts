import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";
import { userUpdateValidationSchema } from "~/modules/users/users.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { checkAccessToUserData } from "./libs/hooks/hooks.js";
import {
	type FinalAnswersRequestDto,
	type UserDto,
	type UserGetParametersDto,
	type UserUpdateParametersDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";
import { finalAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
 *      FinalQuestionsRequest:
 *        type: object
 *        properties:
 *          allowNotifications:
 *            type: string
 *          userTaskDays:
 *            type: array
 *            items:
 *              type: number
 *          userId:
 *            type: number
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
				this.saveFinalAnswers(
					options as APIHandlerOptions<{
						body: FinalAnswersRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: UsersApiPath.FINAL_QUESTIONS,
			validation: {
				body: finalAnswersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.getById(
					options as APIHandlerOptions<{
						params: UserGetParametersDto;
					}>,
				),
			method: "GET",
			path: UsersApiPath.$ID,
			preHandlers: [checkAccessToUserData],
		});

		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: UserUpdateRequestDto;
						params: UserUpdateParametersDto;
					}>,
				),
			method: "PATCH",
			path: UsersApiPath.$ID,
			preHandlers: [checkAccessToUserData],
			validation: {
				body: userUpdateValidationSchema,
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
	 * /users/:id:
	 *    get:
	 *      description: Return user by id
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/User"
	 */
	private async getById(
		options: APIHandlerOptions<{
			params: UserGetParametersDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.find(options.params.id),
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

	private async saveFinalAnswers(
		options: APIHandlerOptions<{
			body: FinalAnswersRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { allowNotifications, userId, userTaskDays } = options.body;

		const updatedUserDto = await this.userService.saveFinalAnswers(userId, {
			allowNotifications,
			userTaskDays,
		});

		return {
			payload: updatedUserDto,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/:id:
	 *    patch:
	 *      description: Update user by id
	 *      requestBody:
	 *        description: Data to update
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/User"
	 */
	private async update(
		options: APIHandlerOptions<{
			body: UserUpdateRequestDto;
			params: UserUpdateParametersDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.update(options.params.id, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
