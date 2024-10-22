import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ChatApi } from "./chat-api.js";

const chatApi = new ChatApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { chatApi };
export { ChatMessageAuthor, ChatMessageType } from "./libs/enums/enums.js";
export {
	type TaskMessage,
	type TaskPayload,
	type TextMessage,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/chat.js";
