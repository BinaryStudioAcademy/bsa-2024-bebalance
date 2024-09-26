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
	taskExplanations: TaskCreateDto[];
};

const processExplainedTasksMessages = (
	newMessages: ChatMessageDto[],
): ProcessMessagesResult => {
	const taskExplanationsMessage: TaskMessage[] = [];
	const processedMessages: ChatMessage[] = [];
	const taskExplanations: TaskCreateDto[] = [];

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
			const { task, text } = message.payload;
			const messagePayload = {
				task: {
					categoryId: task.categoryId,
					categoryName: task.categoryName,
					description: text ?? "",
					label: task.label,
				},
			};
			taskExplanationsMessage.push(messagePayload);
			taskExplanations.push({
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: text ?? "",
				label: task.label,
			});
		}
	}

	processedMessages.push({
		author: ChatMessageAuthor.ASSISTANT,
		isRead: true,
		payload: taskExplanationsMessage,
		type: ChatMessageType.TASK,
	});

	return {
		messages: processedMessages,
		taskExplanations,
	};
};

export { processExplainedTasksMessages };
