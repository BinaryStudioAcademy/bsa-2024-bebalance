import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserDto } from "~/modules/users/users.js";

import { type AiAssistantService } from "./ai-assistant.service.js";
import { AiAssistantApiPath } from "./libs/enums/enums.js";
import {
	type TaskSuggestionRequestDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";
import {
	addMessageToThreadValidationSchema,
	TaskSuggestionRequestValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

class AiAssistantController extends BaseController {
	private openAiService: AiAssistantService;

	public constructor(logger: Logger, openAiService: AiAssistantService) {
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
			path: AiAssistantApiPath.INIT_NEW_CHAT,
		});

		this.addRoute({
			handler: (options) =>
				this.addMessageToConversation(
					options as APIHandlerOptions<{
						body: ThreadMessageCreateDto;
					}>,
				),
			method: "POST",
			path: AiAssistantApiPath.ADD_MESSAGE,
			validation: {
				body: addMessageToThreadValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.suggestTasksForCategories(
					options as APIHandlerOptions<{
						body: TaskSuggestionRequestDto;
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AiAssistantApiPath.SUGGEST_TASKS,
			validation: {
				body: TaskSuggestionRequestValidationSchema,
			},
		});
	}

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

	private async suggestTasksForCategories(
		options: APIHandlerOptions<{
			body: TaskSuggestionRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		return {
			payload: await this.openAiService.suggestTasksForCategories(body),
			status: HTTPCode.OK,
		};
	}
}

export { AiAssistantController };
