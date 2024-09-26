import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type SelectedCategory } from "~/modules/categories/categories.js";
import { ChatMessageAuthor, ChatMessageType } from "~/modules/chat/chat.js";
import { type TaskCreateDto } from "~/modules/tasks/tasks.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { type ChatMessage } from "../libs/types/types.js";
import {
	changeTasksSuggestion,
	createTasksFromSuggestions,
	explainTasksSuggestions,
	getTasksForCategories,
	initConversation,
} from "./actions.js";

type State = {
	buttonsMode: ValueOf<typeof ButtonsModeOption>;
	dataStatus: ValueOf<typeof DataStatus>;
	messages: ChatMessage[];
	selectedCategories: SelectedCategory[];
	taskExplanations: TaskCreateDto[];
	taskSuggestions: TaskCreateDto[];
	threadId: null | string;
};

const initialState: State = {
	buttonsMode: ButtonsModeOption.NONE,
	dataStatus: DataStatus.IDLE,
	messages: [],
	selectedCategories: [],
	taskExplanations: [],
	taskSuggestions: [],
	threadId: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder
			.addCase(createTasksFromSuggestions.pending, (state) => {
				state.taskSuggestions = [];
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(createTasksFromSuggestions.fulfilled, (state) => {
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(createTasksFromSuggestions.rejected, (state) => {
				state.dataStatus = DataStatus.FULFILLED;
			})

			.addCase(initConversation.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(initConversation.fulfilled, (state, action) => {
				state.threadId = action.payload.threadId;

				state.buttonsMode = ButtonsModeOption.SUGGESTIONS_CREATION;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(initConversation.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			})

			.addCase(getTasksForCategories.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(getTasksForCategories.fulfilled, (state, action) => {
				const { messages, taskSuggestions } = action.payload;
				state.dataStatus = DataStatus.FULFILLED;
				state.taskSuggestions = taskSuggestions;

				state.messages.push(...messages);

				state.buttonsMode = ButtonsModeOption.SUGGESTIONS_MANIPULATION;
			})
			.addCase(getTasksForCategories.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			})
			.addCase(explainTasksSuggestions.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(explainTasksSuggestions.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			})
			.addCase(explainTasksSuggestions.fulfilled, (state, action) => {
				const { messages, taskSuggestions } = action.payload;

				state.dataStatus = DataStatus.FULFILLED;
				state.taskExplanations = taskSuggestions;
				state.messages.push(...messages);
				state.buttonsMode = ButtonsModeOption.SUGGESTIONS_MANIPULATION;
			})
			.addCase(changeTasksSuggestion.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(changeTasksSuggestion.fulfilled, (state, action) => {
				const { messages, taskSuggestions } = action.payload;

				state.dataStatus = DataStatus.FULFILLED;
				state.taskSuggestions = taskSuggestions;

				state.messages.push(...messages);

				state.buttonsMode = ButtonsModeOption.SUGGESTIONS_MANIPULATION;
			})
			.addCase(changeTasksSuggestion.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "chat",
	reducers: {
		addAssistantTextMessage(state, action: { payload: string }) {
			const assistantMessage = {
				author: ChatMessageAuthor.ASSISTANT,
				isRead: true,
				payload: { text: action.payload },
				type: ChatMessageType.TEXT,
			};

			state.messages.push(assistantMessage);
		},
		addUserTextMessage(state, action: { payload: string }) {
			const userMessage = {
				author: ChatMessageAuthor.USER,
				isRead: true,
				payload: { text: action.payload },
				type: ChatMessageType.TEXT,
			};

			state.messages.push(userMessage);
		},
		clearChat(state) {
			state.messages = [];
			state.taskSuggestions = [];
			state.selectedCategories = [];
			state.buttonsMode = ButtonsModeOption.NONE;
		},
		setButtonsMode(
			state,
			action: PayloadAction<ValueOf<typeof ButtonsModeOption>>,
		) {
			state.buttonsMode = action.payload;
		},
		updateSelectedCategories(state, action: { payload: SelectedCategory[] }) {
			state.selectedCategories = action.payload;
		},
	},
});

export { actions, name, reducer };
