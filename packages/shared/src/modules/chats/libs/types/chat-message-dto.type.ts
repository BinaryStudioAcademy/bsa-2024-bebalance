import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "../enums/enums.js";

type ChatMessageDto<PayloadType> = {
	author: ValueOf<typeof ChatMessageAuthor>;
	createdAt: string;
	id: number;
	isRead: boolean;
	payload: PayloadType;
	type: ValueOf<typeof ChatMessageType>;
};

export { type ChatMessageDto };
