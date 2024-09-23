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
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantSuggestTaskRequestDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";
import {
	acceptMultipleTasksValidationSchema,
	addMessageToThreadValidationSchema,
	taskActionRequestSchemaValidationSchema,
	taskSuggestionRequestValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * tags:
 *   - name: AI Assistant
 *     description: Endpoints related to AI Assistant services and interactions
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     TaskPayload:
 *       type: object
 *       description: Task details associated with the message.
 *       properties:
 *         categoryId:
 *           type: integer
 *           description: Unique identifier for the category of the task
 *           example: 1
 *         categoryName:
 *           type: string
 *           description: Name of the task category
 *           example: "Health"
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *           example: "Set a goal to prepare at least two healthy home-cooked meals this week, focusing on incorporating more fruits and vegetables into your diet."
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The deadline for the task
 *           example: "2024-09-23T15:15:48.971Z"
 *         label:
 *           type: string
 *           description: A label for the task (priority, tags, etc.)
 *           example: "Healthy Meal Prep"
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
 *     SelectedCategory:
 *       type: object
 *       description: Selected category object.
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the category.
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the category.
 *           example: "Work"
 *
 *     ChatResponse:
 *       type: object
 *       description: Response object containing a list of messages and a thread identifier.
 *       properties:
 *         messages:
 *           type: array
 *           description: Array of chat messages.
 *           items:
 *             $ref: '#/components/schemas/ChatMessage'
 *         threadId:
 *           type: string
 *           description: Identifier for the chat thread.
 *           example: "thread_QwWiRV7jFYMz0i0YGcRvcRsU"
 *
 *     ChatMessageText:
 *       type: object
 *       description: Text message in the chat.
 *       properties:
 *         author:
 *           type: string
 *           description: The author of the message (e.g., "assistant").
 *           example: "assistant"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the message was created.
 *           example: "2024-09-22T10:25:07.841Z"
 *         id:
 *           type: integer
 *           description: Unique identifier for the message.
 *           example: 0
 *         isRead:
 *           type: boolean
 *           description: Indicates if the message has been read.
 *           example: false
 *         payload:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               description: Text content of the message.
 *               example: "Here are some actionable tasks to help you improve in Health and Work."
 *         type:
 *           type: string
 *           description: The type of the message.
 *           example: "text"
 *
 *     ChatMessageTask:
 *       type: object
 *       description: Task message in the chat.
 *       properties:
 *         author:
 *           type: string
 *           description: The author of the message (e.g., "assistant").
 *           example: "assistant"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the message was created.
 *           example: "2024-09-22T10:25:07.841Z"
 *         id:
 *           type: integer
 *           description: Unique identifier for the message.
 *           example: 0
 *         isRead:
 *           type: boolean
 *           description: Indicates if the message has been read.
 *           example: false
 *         payload:
 *           type: object
 *           properties:
 *             task:
 *               type: object
 *               description: Task details associated with the message.
 *               properties:
 *                 categoryId:
 *                   type: integer
 *                   description: Unique identifier for the category of the task.
 *                   example: 1
 *                 categoryName:
 *                   type: string
 *                   description: Name of the task category.
 *                   example: "Health"
 *                 description:
 *                   type: string
 *                   description: Detailed description of the task.
 *                   example: "Set aside 15 minutes in your daily schedule to engage in reflective journaling about your physical health."
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                   description: The deadline for the task.
 *                   example: "2024-09-23T10:24:49.654Z"
 *                 label:
 *                   type: string
 *                   description: A label for the task (priority, tags, etc.).
 *                   example: "Daily Journaling for Health"
 *         type:
 *           type: string
 *           description: The type of the message.
 *           example: "task"
 *
 *     ChatMessageTextExplanation:
 *       type: object
 *       description: Text message with task explanation in the chat.
 *       properties:
 *         author:
 *           type: string
 *           description: The author of the message (e.g., "assistant").
 *           example: "assistant"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the message was created.
 *           example: "2024-09-22T10:25:07.841Z"
 *         id:
 *           type: integer
 *           description: Unique identifier for the message.
 *           example: 0
 *         isRead:
 *           type: boolean
 *           description: Indicates if the message has been read.
 *           example: false
 *         payload:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               description: Explanation of the task suggestion.
 *               example: "This task will help you focus on building healthy eating habits by preparing meals at home."
 *         type:
 *           type: string
 *           description: The type of the message.
 *           example: "text"
 */

class AIAssistantController extends BaseController {
	private openAIService: AIAssistantService;

	public constructor(logger: Logger, openAIService: AIAssistantService) {
		super(logger, APIPath.ASSISTANT);

		this.openAIService = openAIService;

		this.addRoute({
			handler: (options) =>
				this.initializeNewChat(
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
						body: AIAssistantSuggestTaskRequestDto;
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
				this.acceptMultipleTasks(
					options as APIHandlerOptions<{
						body: AIAssistantCreateMultipleTasksDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AIAssistantApiPath.CHAT_ACCEPT_MULTIPLE_TASKS,
			validation: {
				body: acceptMultipleTasksValidationSchema,
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

	private async acceptMultipleTasks(
		options: APIHandlerOptions<{
			body: AIAssistantCreateMultipleTasksDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAIService.acceptMultipleTasks(user, body),
			status: HTTPCode.OK,
		};
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
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_5kL0dVY9ADvmNz8U33P7qFX3"
	 *               payload:
	 *                 $ref: '#/components/schemas/TaskPayload'
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
			payload: await this.openAIService.acceptTask(user, body),
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
			payload: await this.openAIService.addMessageToThread(body),
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
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_5kL0dVY9ADvmNz8U33P7qFX3"
	 *               payload:
	 *                 $ref: '#/components/schemas/TaskPayload'
	 *     responses:
	 *       200:
	 *         description: Returns task suggestions for the provided categories
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 messages:
	 *                   type: array
	 *                   description: Array of chat messages containing task suggestions.
	 *                   items:
	 *                     oneOf:
	 *                       - $ref: '#/components/schemas/ChatMessageText'
	 *                       - $ref: '#/components/schemas/ChatMessageTask'
	 *                 threadId:
	 *                   type: string
	 *                   description: Identifier for the chat thread.
	 *                   example: "thread_QwWiRV7jFYMz0i0YGcRvcRsU"
	 */
	private async changeTaskSuggestion(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAIService.changeTaskSuggestion(user, body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/explain-task:
	 *   post:
	 *     summary: Explain task suggestion
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
	 *               threadId:
	 *                 type: string
	 *                 description: Identifier for the thread
	 *                 example: "thread_5kL0dVY9ADvmNz8U33P7qFX3"
	 *               payload:
	 *                 $ref: '#/components/schemas/TaskPayload'
	 *     responses:
	 *       200:
	 *         description: Returns explanations for the provided task suggestions
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 messages:
	 *                   type: array
	 *                   description: Array of chat messages containing explanations of task suggestions.
	 *                   items:
	 *                     oneOf:
	 *                       - $ref: '#/components/schemas/ChatMessageTextExplanation'
	 *                       - $ref: '#/components/schemas/ChatMessageTask'
	 *                 threadId:
	 *                   type: string
	 *                   description: Identifier for the chat thread.
	 *                   example: "thread_QwWiRV7jFYMz0i0YGcRvcRsU"
	 */
	private async explainTaskSuggestion(
		options: APIHandlerOptions<{
			body: AIAssistantRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		return {
			payload: await this.openAIService.explainTaskSuggestion(body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /assistant/chat/initialize:
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
	 *         description: Returns an initialized chat with an empty message array and thread identifier.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 messages:
	 *                   type: array
	 *                   description: Array of chat messages (initially empty).
	 *                   example: []
	 *                 threadId:
	 *                   type: string
	 *                   description: Identifier for the chat thread.
	 *                   example: "thread_QwWiRV7jFYMz0i0YGcRvcRsU"
	 */
	private async initializeNewChat(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.openAIService.initializeNewChat(user),
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
	 *                   $ref: '#/components/schemas/SelectedCategory'
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
	 *               type: object
	 *               properties:
	 *                 messages:
	 *                   type: array
	 *                   description: Array of chat messages containing task suggestions.
	 *                   items:
	 *                     oneOf:
	 *                       - $ref: '#/components/schemas/ChatMessageText'
	 *                       - $ref: '#/components/schemas/ChatMessageTask'
	 *                 threadId:
	 *                   type: string
	 *                   description: Identifier for the chat thread.
	 *                   example: "thread_QwWiRV7jFYMz0i0YGcRvcRsU"
	 */
	private async suggestTasksForCategories(
		options: APIHandlerOptions<{
			body: AIAssistantSuggestTaskRequestDto;
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body, user } = options;

		return {
			payload: await this.openAIService.suggestTasksForCategories(user, body),
			status: HTTPCode.OK,
		};
	}
}

export { AIAssistantController };
