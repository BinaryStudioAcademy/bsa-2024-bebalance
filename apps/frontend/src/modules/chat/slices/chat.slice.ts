import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type SimplifiedQuizScoreDto } from "../libs/types/types.js";
import { initConversation } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	messages: string[];
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
				state.selectedCategories = action.payload.lowestCategories;
				state.threadId = action.payload.threadId;
				state.messages.push(action.payload.text);
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(initConversation.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "chat",
	reducers: {},
});

export { actions, name, reducer };
