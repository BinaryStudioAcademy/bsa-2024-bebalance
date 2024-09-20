import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { AIAssistantApiPath } from "./libs/enums/enums.js";
import {
	type BalanceWheelAnalysisResponseDto,
	type TaskSuggestionRequestDto,
	type TaskSuggestionsResponseDto,
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

	public async getTasksForCategories(
		payload: TaskSuggestionRequestDto,
	): Promise<TaskSuggestionsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_SUGGEST_TASKS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<TaskSuggestionsResponseDto>();
	}

	public async initiateConversation(): Promise<BalanceWheelAnalysisResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AIAssistantApiPath.CHAT_INITIATE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify({}),
			},
		);

		return await response.json<BalanceWheelAnalysisResponseDto>();
	}
}

export { ChatApi };
