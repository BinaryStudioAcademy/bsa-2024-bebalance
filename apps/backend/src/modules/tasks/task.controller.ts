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

/*** @swagger
 * components:
 *    schemas:
 *      Task:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          category:
 *            type: string
 *          categoryId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          description:
 *            type: string
 *          dueDate:
 *            type: string
 *          label:
 *            type: string
 *          status:
 *            type: string
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
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
	 *    get:
	 *      description: Returns an array of current users tasks
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
	 *                  $ref: "#/components/schemas/Task"
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
	 *      description: Returns an array of past users tasks
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
	 *                  $ref: "#/components/schemas/Task"
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
	 *    patch:
	 *      description: Update a task
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          required: true
	 *          schema:
	 *            type: number
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
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/Task"
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
