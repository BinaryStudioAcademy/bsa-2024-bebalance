import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChatMessage,
	processMessages,
	type TaskCreateDto,
	type ThreadMessageCreateDto,
} from "~/packages/chat/chat";

import { name as sliceName } from "./chat.slice";

const initConversation = createAsyncThunk<
	ThreadMessageCreateDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/initialize-conversation`, async (_, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.initializeConversation();
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

	return processMessages(response.messages);
});

const getChangedTasksSuggestion = createAsyncThunk<
	{
		messages: ChatMessage[];
		taskSuggestions: TaskCreateDto[];
	},
	AIAssistantRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-changed-tasks-suggestion`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const response = await chatApi.getChangedTasksSuggestion(payload);

	return processMessages(response.messages);
});

const getExplainedTasksSuggestion = createAsyncThunk<
	{
		messages: ChatMessage[];
		taskSuggestions: TaskCreateDto[];
	},
	AIAssistantRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-explained-tasks-suggestion`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const response = await chatApi.getExplainedTasksSuggestion(payload);

	return processMessages(response.messages);
});

const createTasks = createAsyncThunk<
	boolean[],
	AIAssistantCreateMultipleTasksDto,
	AsyncThunkConfig
>(`${sliceName}/create-tasks`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.createTasks(payload);
});

export {
	createTasks,
	getChangedTasksSuggestion,
	getExplainedTasksSuggestion,
	getTasksForCategories,
	initConversation,
};
