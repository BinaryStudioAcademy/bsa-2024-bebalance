import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "../enums/enums.js";
import { type BalanceWheelMessage } from "./balance-wheel-message.type.js";
import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

type ChatMessagePayload = BalanceWheelMessage | TaskMessage | TextMessage;

type ChatMessageDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	createdAt: string;
	id: number;
	isRead: boolean;
	payload: ChatMessagePayload;
	type: ValueOf<typeof ChatMessageType>;
};

export { type ChatMessageDto };
