import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat.slice.js";

const initConversation = createAsyncThunk<
	AIAssistantResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/init-conversation`, async (_, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.initiateConversation();
});

const getTasksForCategories = createAsyncThunk<
	AIAssistantResponseDto,
	AIAssistantSuggestTaskRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-tasks-for-categories`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.getTasksForCategories(payload);
});

const explainTasksSuggestions = createAsyncThunk<
	AIAssistantResponseDto,
	AIAssistantRequestDto,
	AsyncThunkConfig
>(`${sliceName}/explain-tasks-suggestions`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.explainTasksSuggestions(payload);
});

const createTasksFromSuggestions = createAsyncThunk<
	boolean[],
	AIAssistantCreateMultipleTasksDto,
	AsyncThunkConfig
>(`${sliceName}/create-tasks-from-suggestions`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.createTasksFromSuggestions(payload);
});

export {
	createTasksFromSuggestions,
	explainTasksSuggestions,
	getTasksForCategories,
	initConversation,
};
