import { type Service, type ValueOf } from "~/libs/types/types.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageRepository } from "./chat-message.repository.js";
import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "./libs/enums/enums.js";
import {
	type ChatMessageDto,
	type ChatMessagePayload,
} from "./libs/types/types.js";

type ChatMessageCreateDto = {
	author: ValueOf<typeof ChatMessageAuthor>;
	payload: ChatMessagePayload;
	threadId: string;
	type: ValueOf<typeof ChatMessageType>;
};

class ChatMessageService implements Service {
	private chatMessageRepository: ChatMessageRepository;

	public constructor(chatMessageRepository: ChatMessageRepository) {
		this.chatMessageRepository = chatMessageRepository;
	}

	public async create(payload: ChatMessageCreateDto): Promise<ChatMessageDto> {
		const chatMessage = await this.chatMessageRepository.create(
			ChatMessageEntity.initializeNew({
				author: payload.author,
				payload: payload.payload,
				threadId: payload.threadId,
				type: payload.type,
			}),
		);

		return chatMessage.toObject() as ChatMessageDto;
	}

	public async delete(id: number): Promise<boolean> {
		return await this.chatMessageRepository.delete(id);
	}

	public async find(id: number): Promise<ChatMessageDto | null> {
		const chatMessage = await this.chatMessageRepository.find(id);

		return chatMessage?.toObject() as ChatMessageDto;
	}

	public async findAll(): Promise<{ items: ChatMessageDto[] }> {
		const chatMessages = await this.chatMessageRepository.findAll();

		return {
			items: chatMessages.map((chatMessage) => {
				return chatMessage.toObject() as ChatMessageDto;
			}),
		};
	}

	public async findByThreadId(threadId: string): Promise<ChatMessageDto[]> {
		const chatMessages =
			await this.chatMessageRepository.findByThreadId(threadId);

		return chatMessages.map((chatMessage) => {
			return chatMessage.toObject() as ChatMessageDto;
		});
	}

	public async update(
		id: number,
		payload: Partial<ChatMessageDto>,
	): Promise<ChatMessageDto> {
		const chatMessage = await this.chatMessageRepository.update(id, payload);

		return chatMessage.toObject() as ChatMessageDto;
	}
}

export { ChatMessageService };
