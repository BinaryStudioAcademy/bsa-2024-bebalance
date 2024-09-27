import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { processMessages } from "../libs/helpers/helpers.js";
import {
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChangeTasksSuggestionPayload,
	type ProcessedMessagesAndSuggestions,
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
	ProcessedMessagesAndSuggestions,
	AIAssistantSuggestTaskRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-tasks-for-categories`, async (payload, { extra }) => {
	const { chatApi } = extra;

	const response = await chatApi.getTasksForCategories(payload);

	return processMessages(response.messages);
});

const createTasksFromSuggestions = createAsyncThunk<
	boolean[],
	AIAssistantCreateMultipleTasksDto,
	AsyncThunkConfig
>(`${sliceName}/create-tasks-from-suggestions`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.createTasksFromSuggestions(payload);
});

const changeTasksSuggestion = createAsyncThunk<
	ProcessedMessagesAndSuggestions,
	ChangeTasksSuggestionPayload,
	AsyncThunkConfig
>(`${sliceName}/change-tasks-suggestion`, async (payload, { extra }) => {
	const { chatApi } = extra;
	const { APIPayload, oldSuggestions } = payload;

	const response = await chatApi.changeTasksSuggestion(APIPayload);

	return processMessages(response.messages, oldSuggestions);
});

export {
	changeTasksSuggestion,
	createTasksFromSuggestions,
	getTasksForCategories,
	initConversation,
};
