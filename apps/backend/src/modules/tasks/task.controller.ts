import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserDto } from "~/modules/users/users.js";

import { TasksApiPath } from "./libs/enums/enums.js";
import { checkAccessToTask } from "./libs/hooks/hooks.js";
import {
	type TaskUpdateParametersDto,
	type TaskUpdateRequestDto,
} from "./libs/types/types.js";
import { taskUpdateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type TaskService } from "./task.service.js";

/**
 * @swagger
 * tags:
 *   - name: tasks
 *     description: Endpoints related to tasks
 * components:
 *   schemas:
 *     TaskStatusEnum:
 *       type: string
 *       enum: [Current, Completed, Skipped]
 *     TaskDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date-time
 *         label:
 *           type: string
 *         status:
 *           $ref: '#/components/schemas/TaskStatusEnum'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class TaskController extends BaseController {
	private taskService: TaskService;

	public constructor(logger: Logger, taskService: TaskService) {
		super(logger, APIPath.TASKS);

		this.taskService = taskService;

		this.addRoute({
			handler: (options) =>
				this.findCurrentByUserId(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "GET",
			path: TasksApiPath.CURRENT,
		});

		this.addRoute({
			handler: (options) =>
				this.findPastByUserId(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "GET",
			path: TasksApiPath.PAST,
		});

		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: TaskUpdateRequestDto;
						params: TaskUpdateParametersDto;
					}>,
				),
			method: "PATCH",
			path: TasksApiPath.$ID,
			preHandlers: [checkAccessToTask(taskService)],
			validation: {
				body: taskUpdateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.updateDeadline(
					options as APIHandlerOptions<{
						params: TaskUpdateParametersDto;
						user: UserDto;
					}>,
				),
			method: "PATCH",
			path: TasksApiPath.DEADLINE_$ID,
			preHandlers: [checkAccessToTask(taskService)],
		});
	}

	/**
	 * @swagger
	 * /tasks/current:
	 *   get:
	 *     tags: [tasks]
	 *     summary: Get user current tasks
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/TaskDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async findCurrentByUserId(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.taskService.findCurrentByUserId(user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /tasks/past:
	 *    get:
	 *      tags: [tasks]
	 *      summary: Get user past tasks
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/TaskDto"
	 *        401:
	 *          description: Unauthorized
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async findPastByUserId(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.taskService.findPastByUserId(user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /tasks/{id}:
	 *   patch:
	 *     tags: [tasks]
	 *     summary: Update task status by id
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         description: Task id
	 *         schema:
	 *           type: integer
	 *           example: 1
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                description:
	 *                  type: string
	 *                label:
	 *                  type: string
	 *                status:
	 *                  $ref: "#/components/schemas/TaskStatusEnum"
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/TaskDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       403:
	 *         description: Forbidden to update other user's tasks
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
			body: TaskUpdateRequestDto;
			params: TaskUpdateParametersDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.update(options.params.id, options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /tasks/deadline/{id}:
	 *    patch:
	 *      description: Update the deadline of a task
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          required: true
	 *          schema:
	 *            type: number
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/Task"
	 */
	private async updateDeadline(
		options: APIHandlerOptions<{
			params: TaskUpdateParametersDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.updateDeadline(
				options.params.id,
				options.user,
			),
			status: HTTPCode.OK,
		};
	}
}

export { TaskController };
