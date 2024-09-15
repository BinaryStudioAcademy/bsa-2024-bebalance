import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type Message } from "../libs/types/message.type.js";
import { type SimplifiedQuizScoreDto } from "../libs/types/types.js";
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
				state.selectedCategories = action.payload.lowestCategories;
				state.threadId = action.payload.threadId;
				state.messages.push(
					{
						text: action.payload.messages.greeting,
						type: "text",
					},
					{
						text: action.payload.messages.comments,
						type: "wheelAnalysis",
					},
					{
						buttonLabels: ["✅  Yes, 3 lowest", "🚫  No smth else"],
						text: action.payload.messages.question,
						type: "confirmationButtons",
					},
				);
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
				const { message, tasks } = action.payload;
				state.messages.push({
					taskList: tasks,
					text: message,
					type: "taskList",
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
				buttonLabels: ["Accept categories"],
				text: "What categories do you want to work on?",
				type: "categoryForm",
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
