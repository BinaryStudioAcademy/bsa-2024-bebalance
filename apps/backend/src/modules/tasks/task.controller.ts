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
	type TaskNoteParametersDto,
	type TaskNoteRequestDto,
	type TaskUpdateParametersDto,
	type TaskUpdateRequestDto,
} from "./libs/types/types.js";
import {
	taskNoteValidationSchema,
	taskUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
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
				this.findAllByUserId(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "GET",
			path: TasksApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.addNote(
					options as APIHandlerOptions<{ body: TaskNoteRequestDto }>,
				),
			method: "POST",
			path: TasksApiPath.NOTES,
			preHandlers: [checkAccessToTask(taskService)],
			validation: {
				body: taskNoteValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.getNotesByTaskId(
					options as APIHandlerOptions<{
						params: TaskNoteParametersDto;
					}>,
				),
			method: "GET",
			path: TasksApiPath.NOTES_$ID,
			preHandlers: [checkAccessToTask(taskService)],
		});
	}

	/**
	 * @swagger
	 * /tasks/notes:
	 *   post:
	 *     tags: [tasks]
	 *     summary: Add a note to a task
	 *     description: Allows users to add a note to a specific task.
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               taskId:
	 *                 type: integer
	 *                 description: The ID of the task to which the note is being added
	 *                 example: 1
	 *               content:
	 *                 type: string
	 *                 description: The content of the note
	 *                 example: "This is a note for a task."
	 *     responses:
	 *       201:
	 *         description: Note added successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               $ref: "#/components/schemas/TaskNoteDto"
	 *       401:
	 *         description: Unauthorized (invalid or missing token)
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       404:
	 *         description: Task not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async addNote(
		options: APIHandlerOptions<{
			body: TaskNoteRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.addNote(options.body),
			status: HTTPCode.CREATED,
		};
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

	private async findAllByUserId(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.taskService.findAllByUserId(user.id),
			status: HTTPCode.OK,
		};
	}

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
	 * /tasks/notes/:id:
	 *   get:
	 *     tags: [tasks]
	 *     summary: Get all task notes
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         description: ID of the task to get notes for
	 *         schema:
	 *           type: integer
	 *           example: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/TaskNoteDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async getNotesByTaskId(
		options: APIHandlerOptions<{
			params: TaskNoteParametersDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.getNotesByTaskId(options.params.id),
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
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               status:
	 *                 $ref: "#/components/schemas/TaskStatusEnum"
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
}

export { TaskController };
