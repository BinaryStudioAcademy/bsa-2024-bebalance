import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { AIAssistantApiPath } from "./libs/enums/enums.js";
import {
	type AIAssistantChatInitializeResponseDto,
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ChatApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ASSISTANT, storage });
	}

	public async createTasksFromSuggestions(
		payload: AIAssistantCreateMultipleTasksDto,
	): Promise<boolean[]> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_ACCEPT_MULTIPLE_TASKS, {}),
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

	public async initiateConversation(): Promise<AIAssistantChatInitializeResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_INITIALIZE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify({}),
			},
		);

		return await response.json<AIAssistantChatInitializeResponseDto>();
	}
}

export { ChatApi };
