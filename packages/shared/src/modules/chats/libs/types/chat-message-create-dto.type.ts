import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type ChatMessageAuthor } from "../enums/chat-message-author.enum.js";
import { type ChatMessageType } from "../enums/chat-message-type.enum.js";
import { type ChatMessagePayload } from "./chat-message-dto.type.js";

type ChatMessageCreateDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	payload: ChatMessagePayload;
	threadId: string;
	type: ValueOf<typeof ChatMessageType>;
};

export { type ChatMessageCreateDto };
