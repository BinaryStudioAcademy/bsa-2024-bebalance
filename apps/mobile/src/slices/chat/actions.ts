import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChatMessage,
	ChatMessageAuthor,
	ChatMessageType,
	checkIsTaskType,
	type TaskCreateDto,
	type TaskMessage,
	type TextMessage,
	type ThreadMessageCreateDto,
} from "~/packages/chat/chat";

import { name as sliceName } from "./chat.slice";

const initConversation = createAsyncThunk<
	ThreadMessageCreateDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/initialize-conversation`, async (_, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.initiateConversation();
});

const getTasksForCategories = createAsyncThunk<
	{
		messages: ChatMessage[];
		taskSuggestions: TaskCreateDto[];
	},
	AIAssistantSuggestTaskRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-tasks-for-categories`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const response = await chatApi.getTasksForCategories(payload);

	const newMessages = response.messages;

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
});

const createTasks = createAsyncThunk<
	boolean[],
	AIAssistantCreateMultipleTasksDto,
	AsyncThunkConfig
>(`${sliceName}/create-tasks`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.createTasks(payload);
});

export { createTasks, getTasksForCategories, initConversation };
