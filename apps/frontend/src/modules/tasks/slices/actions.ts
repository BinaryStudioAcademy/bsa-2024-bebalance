import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type TaskDto,
	type TaskNoteDto,
	type TaskNoteParametersDto,
	type TaskNoteRequestDto,
	type TaskUpdatePayload,
} from "~/modules/tasks/tasks.js";

import { name as sliceName } from "./tasks.slice.js";

const addNote = createAsyncThunk<
	TaskNoteDto,
	TaskNoteRequestDto,
	AsyncThunkConfig
>(`${sliceName}/add-task-note`, async (payload, { extra }) => {
	const { notification, tasksApi } = extra;

	notification.success(NotificationMessage.TASK_NOTES_ADDED);

	return await tasksApi.addNote(payload);
});

const getCurrentTasks = createAsyncThunk<
	TaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-current-tasks`, async (_, { extra }) => {
	const { tasksApi } = extra;

	return await tasksApi.getCurrentTasks();
});

const getPastTasks = createAsyncThunk<TaskDto[], undefined, AsyncThunkConfig>(
	`${sliceName}/get-past-tasks`,
	async (_, { extra }) => {
		const { tasksApi } = extra;

		return await tasksApi.getPastTasks();
	},
);

const getTaskNotes = createAsyncThunk<
	TaskNoteDto[],
	TaskNoteParametersDto,
	AsyncThunkConfig
>(`${sliceName}/get-task-notes`, async (payload, { extra }) => {
	const { tasksApi } = extra;
	const { id } = payload;

	return await tasksApi.getTaskNotes(id);
});

const update = createAsyncThunk<TaskDto, TaskUpdatePayload, AsyncThunkConfig>(
	`${sliceName}/update`,
	async (payload, { extra }) => {
		const { tasksApi } = extra;
		const { id, ...data } = payload;

		return await tasksApi.update(id, data);
	},
);

const updateTaskDeadline = createAsyncThunk<TaskDto, number, AsyncThunkConfig>(
	`${sliceName}/update-task-deadline`,
	async (id: number, { extra }) => {
		const { tasksApi } = extra;

		return await tasksApi.updateTaskDeadline(id);
	},
);

export {
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
	updateTaskDeadline,
};
