import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { addMessageToThreadValidationSchema } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";

import { type AiAssistantService } from "./ai-assistant.service.js";
import { AiAssistantApiPath } from "./libs/enums/enums.js";
import { type ThreadMessageCreateDto } from "./libs/types/types.js";

class AiAssistantController extends BaseController {
	private openAiService: AiAssistantService;

	public constructor(logger: Logger, openAiService: AiAssistantService) {
		super(logger, APIPath.ASSISTANT);

		this.openAiService = openAiService;

		this.addRoute({
			handler: (options) =>
				this.initConversation(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "POST",
			path: AiAssistantApiPath.INITIATE_THREAD,
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

	private async initConversation(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { user } = options;

		return {
			payload: await this.openAiService.initNewThread(user),
			status: HTTPCode.OK,
		};
	}
}

export { AiAssistantController };
