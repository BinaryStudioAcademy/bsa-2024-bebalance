import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "../enums/enums.js";
import { type ChatMessagePayload } from "./chat-message-payload.type.js";

type ChatMessageDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	createdAt: string;
	id: number;
	isRead: boolean;
	payload: ChatMessagePayload;
	threadId: string;
	type: ValueOf<typeof ChatMessageType>;
	updatedAt: string;
};

export { type ChatMessageDto };
