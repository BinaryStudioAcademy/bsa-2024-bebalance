import { type ValueOf } from "../../../../libs/types/types.js";
import { type ChatMessageAuthor } from "../../../chats/chats.js";

type SaveTextMessageDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	text: string;
};

export { type SaveTextMessageDto };
