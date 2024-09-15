import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type BalanceWheelAnalysisResponseDto,
	type TaskSuggestionRequestDto,
	type TaskSuggestionsResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat.slice.js";

const initConversation = createAsyncThunk<
	BalanceWheelAnalysisResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/init-conversation`, async (_, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.initiateConversation();
});

const getTasksForCategories = createAsyncThunk<
	TaskSuggestionsResponseDto,
	TaskSuggestionRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-tasks-for-categories`, async (payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.getTasksForCategories(payload);
});

export { getTasksForCategories, initConversation };
