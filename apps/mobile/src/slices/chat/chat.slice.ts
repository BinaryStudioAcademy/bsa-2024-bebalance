import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {
	ButtonsMode,
	type ChatMessage,
	type ChatMessageAuthor,
	ChatMessageType,
	type SelectedCategory,
	type TaskCreateDto,
} from "~/packages/chat/chat";

import { signOut } from "../auth/actions";
import {
	createTasks,
	getChangedTasksSuggestion,
	getExplainedTasksSuggestion,
	getTasksForCategories,
	initConversation,
} from "./actions";

type State = {
	buttonsMode: ValueOf<typeof ButtonsMode>;
	dataStatus: ValueOf<typeof DataStatus>;
	messages: ChatMessage[];
	selectedCategories: SelectedCategory[];
	taskExplanations: TaskCreateDto[];
	taskSuggestions: TaskCreateDto[];
	threadId: null | string;
};

const initialState: State = {
	buttonsMode: ButtonsMode.GENERATE_TASK,
	dataStatus: DataStatus.IDLE,
	messages: [],
	selectedCategories: [],
	taskExplanations: [],
	taskSuggestions: [],
	threadId: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(initConversation.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(initConversation.fulfilled, (state, action) => {
			state.threadId = action.payload.threadId;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(initConversation.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(createTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.taskSuggestions = [];
		});
		builder.addCase(createTasks.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getTasksForCategories.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getTasksForCategories.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.messages.push(...action.payload.messages);
			state.taskSuggestions.push(...action.payload.taskSuggestions);
			state.buttonsMode = ButtonsMode.EXPLAIN_ACCEPT;
		});
		builder.addCase(getTasksForCategories.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getChangedTasksSuggestion.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getChangedTasksSuggestion.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.messages.push(...action.payload.messages);
			state.taskSuggestions = action.payload.taskSuggestions;
			state.buttonsMode = ButtonsMode.EXPLAIN_ACCEPT;
		});
		builder.addCase(getChangedTasksSuggestion.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getExplainedTasksSuggestion.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getExplainedTasksSuggestion.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.messages.push(...action.payload.messages);
			state.taskExplanations = action.payload.taskExplanations;
			state.buttonsMode = ButtonsMode.ACCEPT_REGENERATE;
		});
		builder.addCase(getExplainedTasksSuggestion.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signOut.pending, () => {
			return initialState;
		});
	},
	initialState,
	name: "chat",
	reducers: {
		addTextMessage(
			state,
			action: {
				payload: {
					author: ValueOf<typeof ChatMessageAuthor>;
					text: string;
				};
			},
		) {
			const { author, text } = action.payload;
			state.messages.push({
				author,
				isRead: true,
				payload: { text },
				type: ChatMessageType.TEXT,
			});
		},
		setButtonsMode(state, action: PayloadAction<ValueOf<typeof ButtonsMode>>) {
			state.buttonsMode = action.payload;
		},
		updateSelectedCategories(state, action: { payload: SelectedCategory[] }) {
			state.selectedCategories = action.payload;
		},
	},
});

export { actions, name, reducer };
