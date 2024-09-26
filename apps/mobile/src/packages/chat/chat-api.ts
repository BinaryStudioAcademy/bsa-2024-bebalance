import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { AIAssistantApiPath } from "./libs/enums/enums";
import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types";

class ChatApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.ASSISTANT, storage });
	}

	public async createTasks(
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

	public async getChangedTasksSuggestion(
		payload: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_CHANGE_TASKS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AIAssistantResponseDto>();
	}

	public async getExplainedTasksSuggestion(
		payload: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_EXPLAIN_TASKS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AIAssistantResponseDto>();
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

	public async initializeConversation(): Promise<ThreadMessageCreateDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_INITIALIZE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify({}),
			},
		);

		return await response.json<ThreadMessageCreateDto>();
	}
}

export { ChatApi };
