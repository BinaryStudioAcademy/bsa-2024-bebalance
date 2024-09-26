import { checkIsTaskMessage } from "../../../libs/guards/guards.js";
import {
	type ChatMessage,
	ChatMessageAuthor,
	type ChatMessageDto,
	ChatMessageType,
	type TextMessage,
} from "../../../modules/chats/chats.js";
import { type TaskCreateDto } from "../../../modules/tasks/tasks.js";
import { createTaskMessagesFromSuggestions } from "../create-task-messages-from-suggestions/create-task-messages-from-suggestions.helper.js";
import { updateSuggestions } from "../update-suggestions/update-suggestions.helper.js";

type ProcessMessagesResult = {
	messages: ChatMessage[];
	taskSuggestions: TaskCreateDto[];
};

const processMessages = (
	newMessages: ChatMessageDto[],
	oldSuggestions?: TaskCreateDto[],
): ProcessMessagesResult => {
	const processedMessages: ChatMessage[] = [];
	let taskSuggestions: TaskCreateDto[] = [];

	for (const message of newMessages) {
		if (message.type === ChatMessageType.TEXT) {
			processedMessages.push({
				author: ChatMessageAuthor.ASSISTANT,
				isRead: true,
				payload: message.payload as TextMessage,
				type: message.type,
			});
		}

		if (checkIsTaskMessage(message)) {
			const { task, text } = message.payload;

			taskSuggestions.push({
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: text ?? task.description,
				label: task.label,
			});
		}
	}

	if (oldSuggestions) {
		taskSuggestions = updateSuggestions(oldSuggestions, taskSuggestions);
	}

	processedMessages.push({
		author: ChatMessageAuthor.ASSISTANT,
		isRead: true,
		payload: createTaskMessagesFromSuggestions(taskSuggestions),
		type: ChatMessageType.TASK,
	});

	return {
		messages: processedMessages,
		taskSuggestions,
	};
};

export { processMessages };
