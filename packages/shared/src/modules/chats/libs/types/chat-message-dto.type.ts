import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "../enums/enums.js";
import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

type ChatMessageDto<Payload = TaskMessage | TextMessage> = {
	author: ValueOf<typeof ChatMessageAuthor>;
	createdAt: string;
	id: number;
	isRead: boolean;
	payload: Payload;
	threadId: string;
	type: ValueOf<typeof ChatMessageType>;
	updatedAt: string;
};

export { type ChatMessageDto };
