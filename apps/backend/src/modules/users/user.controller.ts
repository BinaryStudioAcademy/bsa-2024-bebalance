import { type MultipartFile } from "@fastify/multipart";

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
	type UserDto,
	type UserGetParametersDto,
	type UserUpdateParametersDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";

/**
 * @swagger
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
				this.updateAvatar(
					options as APIHandlerOptions<{
						uploadedFile: MultipartFile;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: UsersApiPath.UPLOAD_AVATAR,
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
	 *          description: Successfull operation
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

	/**
	 * @swagger
	 * /user/avatar:
	 *    post:
	 *      summary: Update user's avatar
	 *      description: Upload a new avatar for the user.
	 *      requestBody:
	 *        description: Avatar file to upload
	 *        required: true
	 *        content:
	 *          multipart/form-data:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                file:
	 *                  type: string
	 *                  format: binary
	 *                  description: The avatar image file to be uploaded.
	 *      responses:
	 *        200:
	 *          description: Avatar updated successfully
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  avatarUrl:
	 *                    type: string
	 *                    description: URL of the uploaded avatar image.
	 *                    example: "https://<bucket-name>.s3.amazonaws.com/<file-name>"
	 *                  id:
	 *                    type: integer
	 *                    description: User ID.
	 *                  email:
	 *                    type: string
	 *                    description: User's email.
	 *                  name:
	 *                    type: string
	 *                    description: User's name.
	 *                  createdAt:
	 *                    type: string
	 *                    format: date-time
	 *                    description: Timestamp of user creation.
	 *                  updatedAt:
	 *                    type: string
	 *                    format: date-time
	 *                    description: Timestamp of the last update.
	 *        400:
	 *          description: Bad Request - Missing required file
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  status:
	 *                    type: integer
	 *                    example: 400
	 *                  error:
	 *                    type: string
	 *                    example: "Bad Request"
	 *                  message:
	 *                    type: string
	 *                    example: "Invalid request: A required file is missing. Please ensure that all necessary files are included and try again."
	 */
	private async updateAvatar(
		options: APIHandlerOptions<{
			uploadedFile: MultipartFile;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const user = await this.userService.updateAvatar(
			options.user.id,
			options.uploadedFile,
		);

		return {
			payload: user?.toObject(),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
