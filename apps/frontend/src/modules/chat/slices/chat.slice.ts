import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type SelectedCategory } from "~/modules/categories/categories.js";
import {
	type ButtonsMode,
	ChatMessageAuthor,
	ChatMessageType,
} from "~/modules/chat/chat.js";

import { type ChatMessageDto } from "../libs/types/types.js";
import { getTasksForCategories, initConversation } from "./actions.js";

type State = {
	buttonsMode: ButtonsMode;
	dataStatus: ValueOf<typeof DataStatus>;
	messages: Omit<ChatMessageDto, "createdAt" | "id">[];
	selectedCategories: SelectedCategory[];
	threadId: null | string;
};

const initialState: State = {
	buttonsMode: "taskGenerationOptions",
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
				const newMessages = action.payload.messages;

				for (const message of newMessages) {
					state.messages.push(message);
				}
			})
			.addCase(getTasksForCategories.rejected, (state) => {
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
		setButtonsMode(state, action: PayloadAction<ButtonsMode>) {
			state.buttonsMode = action.payload;
		},
		updateSelectedCategories(state, action: { payload: SelectedCategory[] }) {
			state.selectedCategories = action.payload;
		},
	},
});

export { actions, name, reducer };
