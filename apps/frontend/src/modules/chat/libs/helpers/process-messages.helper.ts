import { ChatMessageAuthor, ChatMessageType } from "~/modules/chat/chat.js";
import { type TaskCreateDto } from "~/modules/tasks/tasks.js";

import {
	type ChatMessage,
	type ChatMessageDto,
	type TextMessage,
} from "../../libs/types/types.js";
import { checkIsTaskMessage } from "../guards/guards.js";
import { createTaskMessagesFromSuggestions } from "./create-task-messages-from-suggestions.helper.js";
import { updateSuggestions } from "./update-suggestions.helper.js";

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
			const { task } = message.payload;
			taskSuggestions.push({
				categoryId: task.categoryId,
				categoryName: task.categoryName,
				description: task.description,
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
