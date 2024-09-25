import { type Repository } from "~/libs/types/types.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageModel } from "./chat-message.model.js";
import { ChatMessageType, SortOrder } from "./libs/enums/enums.js";
import { type TaskMessage, type TextMessage } from "./libs/types/types.js";

class ChatMessageRepository implements Repository {
	private chatMessageModel: typeof ChatMessageModel;

	constructor(chatMessageModel: typeof ChatMessageModel) {
		this.chatMessageModel = chatMessageModel;
	}

	public async create(entity: ChatMessageEntity): Promise<ChatMessageEntity> {
		const { author, isRead, payload, threadId, type } = entity.toObject();

		const insertData: Partial<ChatMessageModel> = {
			author,
			isRead,
			threadId,
			type,
		};

		if (type === ChatMessageType.TASK) {
			const { task, text } = payload as TaskMessage;
			insertData.task = task;

			if (text) {
				insertData.text = text;
			}
		}

		if (type === ChatMessageType.TEXT) {
			insertData.text = (payload as TextMessage).text;
		}

		const chatMessage = await this.chatMessageModel
			.query()
			.insert(insertData)
			.returning("*");

		return ChatMessageEntity.initialize({
			author: chatMessage.author,
			createdAt: chatMessage.createdAt,
			id: chatMessage.id,
			isRead: chatMessage.isRead,
			task: chatMessage.task,
			text: chatMessage.text,
			threadId: chatMessage.threadId,
			type: chatMessage.type,
			updatedAt: chatMessage.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.chatMessageModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async find(id: number): Promise<ChatMessageEntity | null> {
		const chatMessage = await this.chatMessageModel.query().findById(id);

		return chatMessage
			? ChatMessageEntity.initialize({
					author: chatMessage.author,
					createdAt: chatMessage.createdAt,
					id: chatMessage.id,
					isRead: chatMessage.isRead,
					task: chatMessage.task,
					text: chatMessage.text,
					threadId: chatMessage.threadId,
					type: chatMessage.type,
					updatedAt: chatMessage.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<ChatMessageEntity[]> {
		const chatMessages = await this.chatMessageModel.query();

		return chatMessages.map((chatMessage) => {
			return ChatMessageEntity.initialize({
				author: chatMessage.author,
				createdAt: chatMessage.createdAt,
				id: chatMessage.id,
				isRead: chatMessage.isRead,
				task: chatMessage.task,
				text: chatMessage.text,
				threadId: chatMessage.threadId,
				type: chatMessage.type,
				updatedAt: chatMessage.updatedAt,
			});
		});
	}

	public async findByThreadId(threadId: string): Promise<ChatMessageEntity[]> {
		const chatMessages = await this.chatMessageModel
			.query()
			.where({ threadId })
			.orderBy("id", SortOrder.ASC);

		return chatMessages.map((chatMessage) => {
			return ChatMessageEntity.initialize({
				author: chatMessage.author,
				createdAt: chatMessage.createdAt,
				id: chatMessage.id,
				isRead: chatMessage.isRead,
				task: chatMessage.task,
				text: chatMessage.text,
				threadId: chatMessage.threadId,
				type: chatMessage.type,
				updatedAt: chatMessage.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		payload: Partial<ChatMessageModel>,
	): Promise<ChatMessageEntity> {
		const chatMessage = await this.chatMessageModel
			.query()
			.patchAndFetchById(id, payload);

		return ChatMessageEntity.initialize({
			author: chatMessage.author,
			createdAt: chatMessage.createdAt,
			id: chatMessage.id,
			isRead: chatMessage.isRead,
			task: chatMessage.task,
			text: chatMessage.text,
			threadId: chatMessage.threadId,
			type: chatMessage.type,
			updatedAt: chatMessage.updatedAt,
		});
	}
}

export { ChatMessageRepository };
