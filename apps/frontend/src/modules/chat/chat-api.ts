import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";

import { AIAssistantApiPath } from "./libs/enums/enums.js";
import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
} from "./libs/types/types.js";

class ChatApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.ASSISTANT, storage });
	}

	public async createTasksFromSuggestions(
		payload: AIAssistantCreateMultipleTasksDto,
	): Promise<boolean[]> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_ACCEPT_TASKS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<boolean[]>();
	}

	public async getTasksForCategories(
		payload: AIAssistantSuggestTaskRequestDto,
	): Promise<AIAssistantResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_SUGGEST_TASKS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AIAssistantResponseDto>();
	}

	public async initiateConversation(): Promise<AIAssistantResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_INITIALIZE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify({}),
			},
		);

		return await response.json<AIAssistantResponseDto>();
	}
}

export { ChatApi };
