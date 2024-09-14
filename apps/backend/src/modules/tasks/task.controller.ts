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
}

export { TaskController };