import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserDto } from "~/modules/users/users.js";

import { type AIAssistantService } from "./ai-assistant.service.js";
import { AIAssistantApiPath } from "./libs/enums/enums.js";
import {
	type AIAssistantRequestDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";
import {
	addMessageToThreadValidationSchema,
	taskActionRequestSchemaValidationSchema,
	taskSuggestionRequestValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     NewTask:
 *       type: object
 *       required:
 *         - categoryId
 *         - categoryName
 *         - description
 *         - dueDate
 *         - label
 *       properties:
 *         categoryId:
 *           type: integer
 *           description: Unique identifier for the category of the task
 *           example: 1
 *         categoryName:
 *           type: string
 *           description: Name of the task category
 *           example: "Work"
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *           example: "Finish the project by the deadline"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The deadline for the task
 *           example: "2024-09-30"
 *         label:
 *           type: string
 *           description: A label for the task (priority, tags, etc.)
 *           example: "Finish project"
 *
 *     Task:
 *       type: object
 *       required:
 *         - categoryId
 *         - createdAt
 *         - description
 *         - dueDate
 *         - id
 *         - label
 *         - status
 *         - updatedAt
 *         - userId
 *       properties:
 *         categoryId:
 *           type: integer
 *           description: Unique identifier for the category of the task
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the task was created
 *           example: "2024-09-01T08:30:00Z"
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *           example: "Complete the client project by the end of the month"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The deadline for completing the task
 *           example: "2024-09-30T10:00:00Z"
 *         id:
 *           type: integer
 *           description: Unique identifier for the task
 *           example: 123
 *         label:
 *           type: string
 *           description: Label or tag associated with the task
 *           example: "Complete project"
 *         status:
 *           type: string
 *           description: Current status of the task
 *           enum:
 *             - Completed
 *             - Current
 *             - Skipped
 *           example: "Current"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the task was last updated
 *           example: "2024-09-15T12:45:00Z"
 *         userId:
 *           type: integer
 *           description: Unique identifier of the user who created the task
 *           example: 42
 *
 * tags:
 *   - name: AI Assistant
 *     description: Endpoints related to AI Assistant services and interactions
 */

class AIAssistantController extends BaseController {
	private openAiService: AIAssistantService;

	public constructor(logger: Logger, openAiService: AIAssistantService) {
		super(logger, APIPath.ASSISTANT);

		this.openAiService = openAiService;

		this.addRoute({
			handler: (options) =>
				this.initNewChat(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_INITIATE,
		});

		this.addRoute({
			handler: (options) =>
				this.addMessageToConversation(
					options as APIHandlerOptions<{
						body: ThreadMessageCreateDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_ADD_MESSAGE,
			validation: {
				body: addMessageToThreadValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.changeTaskSuggestion(
					options as APIHandlerOptions<{
						body: AIAssistantRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_CHANGE_TASK,
			validation: {
				body: taskActionRequestSchemaValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.explainTaskSuggestion(
					options as APIHandlerOptions<{
						body: AIAssistantRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_EXPLAIN_TASK,
			validation: {
				body: taskActionRequestSchemaValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.suggestTasksForCategories(
					options as APIHandlerOptions<{
						body: AIAssistantRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_SUGGEST_TASKS,
			validation: {
				body: taskSuggestionRequestValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.acceptTask(
					options as APIHandlerOptions<{
						body: AIAssistantRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_ACCEPT_TASK,
			validation: {
				body: taskActionRequestSchemaValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /assistant/chat/accept-task:
	 *   post:
	 *     summary: Accept a task suggestion
	 *     tags:
	 *       - AI Assistant
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               task:
	 *                 $ref: '#/components/schemas/NewTask'
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_abc123"
	 *     responses:
	 *       200:
	 *         description: Returns the accepted task
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Task'
	 */
	private async acceptTask(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAiService.acceptTask(user, body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/add-message:
	 *   post:
	 *     summary: Add a message to a conversation thread
	 *     tags:
	 *       - AI Assistant
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               text:
	 *                 type: string
	 *                 description: The text message to add to the thread
	 *                 example: "Hello, how can I assist you?"
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the conversation thread
	 *                 example: "thread_abc123"
	 *     responses:
	 *       200:
	 *         description: Indicates if the message was successfully added
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *               example: true
	 */
	private async addMessageToConversation(
		options: APIHandlerOptions<{
			body: ThreadMessageCreateDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		return {
			payload: await this.openAiService.addMessageToThread(body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/change-task:
	 *   post:
	 *     summary: Change task
	 *     tags:
	 *       - AI Assistant
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               task:
	 *                 $ref: '#/components/schemas/NewTask'
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_abc123"
	 *     responses:
	 *       200:
	 *         description: Returns task suggestions based on the provided input
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   description: Message about the task suggestion
	 *                   example: "Task suggestions updated successfully"
	 *                 tasks:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/NewTask'
	 */
	private async changeTaskSuggestion(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAiService.changeTaskSuggestion(user, body),
			status: HTTPCode.OK,
		};
	}

	private async explainTaskSuggestion(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		return {
			payload: await this.openAiService.explainTaskSuggestion(body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/initiate:
	 *   post:
	 *     summary: Initialize a new chat
	 *     tags:
	 *       - AI Assistant
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: This endpoint doesn't require a request body.
	 *       content: {}
	 *     responses:
	 *       200:
	 *         description: Returns the analysis of the balance wheel with messages and thread information
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 lowestCategories:
	 *                   type: array
	 *                   description: Array of the lowest scoring categories
	 *                   items:
	 *                     $ref: '#/components/schemas/QuizScore'
	 *                 messages:
	 *                   type: object
	 *                   properties:
	 *                     comments:
	 *                       type: string
	 *                       description: Comments for the analysis
	 *                       example: "Your balance wheel shows imbalance in certain areas."
	 *                     greeting:
	 *                       type: string
	 *                       description: Greeting message
	 *                       example: "Welcome to your analysis!"
	 *                     question:
	 *                       type: string
	 *                       description: A question posed to the user
	 *                       example: "How do you feel about these results?"
	 *                 threadId:
	 *                   type: string
	 *                   description: Identifier for the chat thread
	 *                   example: "thread_abc123"
	 * components:
	 *   schemas:
	 *     BalanceWheelAnalysis:
	 *       type: object
	 *       properties:
	 *         lowestCategories:
	 *           type: array
	 *           description: Array of the lowest scoring categories
	 *           items:
	 *             $ref: '#/components/schemas/QuizScore'
	 *         messages:
	 *           type: object
	 *           properties:
	 *             comments:
	 *               type: string
	 *               description: Comments for the analysis
	 *               example: "Your balance wheel shows imbalance in certain areas."
	 *             greeting:
	 *               type: string
	 *               description: Greeting message
	 *               example: "Welcome to your analysis!"
	 *             question:
	 *               type: string
	 *               description: A question posed to the user
	 *               example: "How do you feel about these results?"
	 *         threadId:
	 *           type: string
	 *           description: Identifier for the chat thread
	 *           example: "thread_abc123"
	 *     QuizScore:
	 *       type: object
	 *       properties:
	 *         categoryName:
	 *           type: string
	 *           description: The category name
	 *           example: "Health"
	 *         categoryId:
	 *           type: integer
	 *           description: The category id
	 *           example: 1
	 */
	private async initNewChat(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.openAiService.initNewChat(user),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/suggest-tasks:
	 *   post:
	 *     summary: Suggest tasks for selected categories
	 *     tags:
	 *       - AI Assistant
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               categories:
	 *                 type: array
	 *                 description: Array of selected categories for task suggestions
	 *                 items:
	 *                   $ref: '#/components/schemas/SelectedCategories'
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_abc123"
	 *     responses:
	 *       200:
	 *         description: Returns task suggestions for the provided categories
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TaskSuggestionsResponseDto'
	 * components:
	 *   securitySchemes:
	 *     bearerAuth:
	 *       type: http
	 *       scheme: bearer
	 *       bearerFormat: JWT
	 *   schemas:
	 *     SelectedCategories:
	 *       type: object
	 *       properties:
	 *         categoryId:
	 *           type: integer
	 *           description: Unique identifier for the category
	 *           example: 1
	 *         name:
	 *           type: string
	 *           description: Name of the category
	 *           example: "Work"
	 *     TaskSuggestionsResponseDto:
	 *       type: object
	 *       properties:
	 *         message:
	 *           type: string
	 *           description: Response message regarding task suggestions
	 *           example: "Tasks suggested successfully."
	 *         tasks:
	 *           type: array
	 *           description: Suggested tasks for the selected categories
	 *           items:
	 *             $ref: '#/components/schemas/TaskCreateDto'
	 *     TaskCreateDto:
	 *       type: object
	 *       required:
	 *         - categoryId
	 *         - categoryName
	 *         - description
	 *         - dueDate
	 *         - label
	 *       properties:
	 *         categoryId:
	 *           type: integer
	 *           description: Unique identifier for the category of the task
	 *           example: 1
	 *         categoryName:
	 *           type: string
	 *           description: Name of the task category
	 *           example: "Work"
	 *         description:
	 *           type: string
	 *           description: Detailed description of the task
	 *           example: "Finish the project by the deadline"
	 *         dueDate:
	 *           type: string
	 *           format: date-time
	 *           description: The deadline for the task
	 *           example: "2024-09-30T10:00:00Z"
	 *         label:
	 *           type: string
	 *           description: A label for the task
	 *           example: "High Priority"
	 */
	private async suggestTasksForCategories(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAiService.suggestTasksForCategories(user, body),
			status: HTTPCode.OK,
		};
	}
}

export { AIAssistantController };
