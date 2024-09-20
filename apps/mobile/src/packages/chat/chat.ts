import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { ChatApi } from "./chat-api";

const chatApi = new ChatApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { chatApi };
export {
	AIAssistantApiPath,
	ButtonsMode,
	ChatMessageAuthor,
	ChatMessageType,
} from "./libs/enums/enums";
export { checkIsTaskType } from "./libs/helpers/helpers";
export {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChatMessage,
	type ChatMessageDto,
	type SelectedCategory,
	type TaskCreateDto,
	type TaskDto,
	type TaskMessage,
	type TextMessage,
	type ThreadMessageCreateDto,
} from "./libs/types/types";
