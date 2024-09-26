import {
	type ChatMessage,
	ChatMessageAuthor,
	type ChatMessageDto,
	ChatMessageType,
	checkIsTaskType,
	type TextMessage,
} from "~/packages/chat/chat";

type ProcessMessagesResult = {
	messages: ChatMessage[];
};

const processExplainedTasksMessages = (
	newMessages: ChatMessageDto[],
): ProcessMessagesResult => {
	const processedMessages: ChatMessage[] = [];

	for (const message of newMessages) {
		if (message.type === ChatMessageType.TEXT) {
			processedMessages.push({
				author: ChatMessageAuthor.ASSISTANT,
				isRead: true,
				payload: message.payload as TextMessage,
				type: message.type,
			});
		}

		if (checkIsTaskType(message)) {
			const { text } = message.payload;
			processedMessages.push({
				author: ChatMessageAuthor.ASSISTANT,
				isRead: true,
				payload: text as TextMessage,
				type: ChatMessageType.TASK,
			});
		}
	}

	return {
		messages: processedMessages,
	};
};

export { processExplainedTasksMessages };
