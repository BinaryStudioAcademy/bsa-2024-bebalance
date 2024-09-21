import { type Entity, type ValueOf } from "~/libs/types/types.js";

import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "./libs/enums/enums.js";
import { type ChatMessagePayload } from "./libs/types/types.js";

class ChatMessageEntity implements Entity {
	private author: ValueOf<typeof ChatMessageAuthor>;

	private createdAt: string;

	private id: null | number;

	private isRead: boolean;

	private payload: ChatMessagePayload;

	private threadId: string;

	private type: ValueOf<typeof ChatMessageType>;

	private updatedAt: string;

	private constructor({
		author,
		createdAt,
		id,
		isRead,
		payload,
		threadId,
		type,
		updatedAt,
	}: {
		author: ValueOf<typeof ChatMessageAuthor>;
		createdAt: string;
		id: null | number;
		isRead: boolean;
		payload: ChatMessagePayload;
		threadId: string;
		type: ValueOf<typeof ChatMessageType>;
		updatedAt: string;
	}) {
		this.author = author;
		this.id = id;
		this.createdAt = createdAt;
		this.isRead = isRead;
		this.payload = payload;
		this.threadId = threadId;
		this.type = type;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		author,
		createdAt,
		id,
		isRead,
		payload,
		threadId,
		type,
		updatedAt,
	}: {
		author: ValueOf<typeof ChatMessageAuthor>;
		createdAt: string;
		id: null | number;
		isRead: boolean;
		payload: ChatMessagePayload;
		threadId: string;
		type: ValueOf<typeof ChatMessageType>;
		updatedAt: string;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			author,
			createdAt,
			id,
			isRead,
			payload,
			threadId,
			type,
			updatedAt,
		});
	}

	public static initializeNew({
		author,
		payload,
		threadId,
		type,
	}: {
		author: ValueOf<typeof ChatMessageAuthor>;
		payload: ChatMessagePayload;
		threadId: string;
		type: ValueOf<typeof ChatMessageType>;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			author,
			createdAt: "",
			id: null,
			isRead: false,
			payload,
			threadId,
			type,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		author: ValueOf<typeof ChatMessageAuthor>;
		createdAt: string;
		isRead: boolean;
		payload: ChatMessagePayload;
		threadId: string;
		type: ValueOf<typeof ChatMessageType>;
		updatedAt: string;
	} {
		return {
			author: this.author,
			createdAt: this.createdAt,
			isRead: this.isRead,
			payload: this.payload,
			threadId: this.threadId,
			type: this.type,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		author: ValueOf<typeof ChatMessageAuthor>;
		createdAt: string;
		id: null | number;
		isRead: boolean;
		payload: ChatMessagePayload;
		threadId: string;
		type: ValueOf<typeof ChatMessageType>;
		updatedAt: string;
	} {
		return {
			author: this.author,
			createdAt: this.createdAt,
			id: this.id as number,
			isRead: this.isRead,
			payload: this.payload,
			threadId: this.threadId,
			type: this.type,
			updatedAt: this.updatedAt,
		};
	}
}

export { ChatMessageEntity };
