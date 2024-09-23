import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "../enums/enums.js";
import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

// type ChatMessagePayload = TaskMessage | TextMessage;

type ChatMessageDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	createdAt: string;
	id: number;
	isRead: boolean;
	payload: TaskMessage | TaskMessage[] | TextMessage;
	type: ValueOf<typeof ChatMessageType>;
};

export { type ChatMessageDto };
