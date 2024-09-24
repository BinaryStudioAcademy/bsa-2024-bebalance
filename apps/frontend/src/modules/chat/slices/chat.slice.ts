import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type SelectedCategory } from "~/modules/categories/categories.js";
import { ChatMessageAuthor, ChatMessageType } from "~/modules/chat/chat.js";
import { type TaskCreateDto } from "~/modules/tasks/tasks.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { checkIsTaskMessage } from "../libs/helpers/helpers.js";
import {
	type ChatMessageDto,
	type TaskMessage,
	type TextMessage,
} from "../libs/types/types.js";
import {
	createTasksFromSuggestions,
	getTasksForCategories,
	initConversation,
} from "./actions.js";

type State = {
	buttonsMode: ValueOf<typeof ButtonsModeOption>;
	dataStatus: ValueOf<typeof DataStatus>;
	messages: Omit<
		ChatMessageDto<TaskMessage[] | TextMessage>,
		"createdAt" | "id"
	>[];
	selectedCategories: SelectedCategory[];
	taskSuggestions: TaskCreateDto[];
	threadId: null | string;
};

const initialState: State = {
	buttonsMode: ButtonsModeOption.NONE,
	dataStatus: DataStatus.IDLE,
	messages: [],
	selectedCategories: [],
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
				state.dataStatus = DataStatus.FULFILLED;
				const newMessages = action.payload.messages;
				const taskSuggestionsMessagePayload: TaskMessage[] = [];

				for (const message of newMessages) {
					if (message.type === "text") {
						state.messages.push({
							author: ChatMessageAuthor.ASSISTANT,
							isRead: true,
							payload: message.payload as TextMessage,
							type: message.type,
						});
					}

					if (checkIsTaskMessage(message)) {
						taskSuggestionsMessagePayload.push(message.payload);
						state.taskSuggestions.push({
							categoryId: message.payload.task.categoryId,
							categoryName: message.payload.task.categoryName,
							description: message.payload.task.description,
							label: message.payload.task.label,
						});
					}
				}

				state.messages.push({
					author: ChatMessageAuthor.ASSISTANT,
					isRead: true,
					payload: taskSuggestionsMessagePayload,
					type: ChatMessageType.TASK,
				});

				state.buttonsMode = ButtonsModeOption.SUGGESTIONS_MANIPULATION;
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
