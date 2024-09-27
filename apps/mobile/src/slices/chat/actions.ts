import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type AIAssistantChangeTaskRequestDto,
	type AIAssistantChatInitializeResponseDto,
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantExplainTaskRequestDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChatMessage,
	processExplainedTasksMessages,
	processMessages,
	type TaskCreateDto,
} from "~/packages/chat/chat";

import { name as sliceName } from "./chat.slice";

const initConversation = createAsyncThunk<
	AIAssistantChatInitializeResponseDto,
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
	AIAssistantChangeTaskRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-changed-tasks-suggestion`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const response = await chatApi.getChangedTasksSuggestion(payload);

	return processMessages(response.messages);
});

const getExplainedTasksSuggestion = createAsyncThunk<
	{
		messages: ChatMessage[];
		taskExplanations: TaskCreateDto[];
	},
	AIAssistantExplainTaskRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-explained-tasks-suggestion`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const response = await chatApi.getExplainedTasksSuggestion(payload);

	return processExplainedTasksMessages(response.messages);
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
