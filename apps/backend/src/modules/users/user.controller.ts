import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UploadedFile } from "~/modules/files/files.js";
import { type UserService } from "~/modules/users/user.service.js";
import { userUpdateValidationSchema } from "~/modules/users/users.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { checkAccessToUserData } from "./libs/hooks/hooks.js";
import {
	type NotificationAnswersPayloadDto,
	type NotificationAnswersRequestDto,
	type UserDto,
	type UserGetParametersDto,
	type UserUpdateParametersDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";
import { notificationAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Endpoints related to users
 * components:
 *    schemas:
 *      NotificationFrequencyEnum:
 *        type: string
 *        enum: [all, none]
 *      UserDto:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            example: 1
 *          avatarFileId:
 *            type: integer
 *            nullable: true
 *            example: 1
 *          email:
 *            type: string
 *            format: email
 *          name:
 *            type: string
 *          avatarUrl:
 *            type: string
 *            nullable: true
 *            example: https://example.com/avatar.png
 *          notificationFrequency:
 *            $ref: '#/components/schemas/NotificationFrequencyEnum'
 *          userTaskDays:
 *            type: array
 *            items:
 *              type: number
 *            example: [1, 2, 3, 4, 5]
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
						uploadedFile: UploadedFile;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: UsersApiPath.AVATAR,
		});

		this.addRoute({
			handler: (options) =>
				this.saveNotificationAnswers(
					options as APIHandlerOptions<{
						body: NotificationAnswersRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: UsersApiPath.NOTIFICATION_QUESTIONS,
			validation: {
				body: notificationAnswersValidationSchema,
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
	 *   get:
	 *     tags: [users]
	 *     summary: Get all users
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
	 *                     $ref: "#/components/schemas/UserDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   get:
	 *     tags: [users]
	 *     summary: Get user by id
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         description: User id to get
	 *         schema:
	 *           type: integer
	 *           example: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/UserDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async getById(
		options: APIHandlerOptions<{
			params: UserGetParametersDto;
		}>,
	): Promise<APIHandlerResponse> {
		const user = await this.userService.find(options.params.id);

		return {
			payload: user,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/notification-questions:
	 *   post:
	 *     tags: [users]
	 *     summary: Save user notification preferences
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               notificationFrequency:
	 *                 $ref: "#/components/schemas/NotificationFrequencyEnum"
	 *               userTaskDays:
	 *                 type: array
	 *                 items:
	 *                   type: integer
	 *                 example: [1, 2, 3, 4, 5]
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/UserDto"
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
	private async saveNotificationAnswers(
		options: APIHandlerOptions<{
			body: NotificationAnswersPayloadDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const updatedUserDto = await this.userService.saveNotificationAnswers(
			options.user.id,
			options.body,
		);

		return {
			payload: updatedUserDto,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   patch:
	 *     tags: [users]
	 *     summary: Update user data by id
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         description: User id to update
	 *         schema:
	 *           type: integer
	 *           example: 1
	 *     requestBody:
	 *       description: Data to update
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/UserDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       403:
	 *         description: Forbidden to update other users data
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
	 * /users/avatar:
	 *   post:
	 *     tags: [users]
	 *     summary: Update user's avatar
	 *     description: Upload a new avatar for the user.
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: Avatar file to upload
	 *       required: true
	 *       content:
	 *         multipart/form-data:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               file:
	 *                 type: string
	 *                 format: binary
	 *                 description: The avatar image file to be uploaded.
	 *     responses:
	 *       200:
	 *         description: Avatar updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/UserDto"
	 *       400:
	 *         description: Bad Request - Missing required file
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async updateAvatar(
		options: APIHandlerOptions<{
			uploadedFile: UploadedFile;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const user = await this.userService.updateAvatar(
			options.user.id,
			options.uploadedFile,
		);

		return {
			payload: user,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
