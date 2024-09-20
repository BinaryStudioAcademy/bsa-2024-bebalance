import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { ChatButtonLabels, ChatMessageType } from "../libs/enums/enums.js";
import {
	type Message,
	type SimplifiedQuizScoreDto,
} from "../libs/types/types.js";
import { getTasksForCategories, initConversation } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	messages: Message[];
	selectedCategories: SimplifiedQuizScoreDto[];
	threadId: null | string;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	messages: [],
	selectedCategories: [],
	threadId: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder
			.addCase(initConversation.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(initConversation.fulfilled, (state, action) => {
				state.threadId = action.payload.threadId;

				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(initConversation.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			})
			.addCase(getTasksForCategories.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(getTasksForCategories.fulfilled, (state, action) => {
				state.dataStatus = DataStatus.FULFILLED;
				state.messages.push({
					...action.payload,
					type: ChatMessageType.TASK_LIST,
				});
			})
			.addCase(getTasksForCategories.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "chat",
	reducers: {
		addCategoryCheckboxMessage(state) {
			state.messages.push({
				buttonLabels: [ChatButtonLabels.ACCEPT_CATEGORIES],
				message: "What categories do you want to work on?",
				type: ChatMessageType.CATEGORY_FORM,
			});
		},
		updateSelectedCategories(
			state,
			action: { payload: SimplifiedQuizScoreDto[] },
		) {
			state.selectedCategories = action.payload;
		},
	},
});

export { actions, name, reducer };
