import {
	type ChatMessage,
	ChatMessageAuthor,
	type ChatMessageDto,
	ChatMessageType,
	checkIsTaskType,
	type TaskCreateDto,
	type TaskMessage,
	type TextMessage,
} from "~/packages/chat/chat";

type ProcessMessagesResult = {
	messages: ChatMessage[];
	taskSuggestions: TaskCreateDto[];
};

const processMessages = (
	newMessages: ChatMessageDto[],
): ProcessMessagesResult => {
	const taskSuggestionsMessage: TaskMessage[] = [];
	const processedMessages: ChatMessage[] = [];
	const taskSuggestions: TaskCreateDto[] = [];

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
			const { task } = message.payload;
			taskSuggestionsMessage.push(message.payload);
			taskSuggestions.push({
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: task.description,
				label: task.label,
			});
		}
	}

	processedMessages.push({
		author: ChatMessageAuthor.ASSISTANT,
		isRead: true,
		payload: taskSuggestionsMessage,
		type: ChatMessageType.TASK,
	});

	return {
		messages: processedMessages,
		taskSuggestions,
	};
};

export { processMessages };
