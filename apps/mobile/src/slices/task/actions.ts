import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type TaskDto, type TaskUpdatePayload } from "~/packages/tasks/tasks";

import { name as sliceName } from "./task.slice";

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

const updateTask = createAsyncThunk<
	TaskDto,
	TaskUpdatePayload,
	AsyncThunkConfig
>(`${sliceName}/update-task`, async (payload, { extra }) => {
	const { tasksApi } = extra;
	const { id, ...data } = payload;

	return await tasksApi.updateTask(id, data);
});

export { getCurrentTasks, getPastTasks, updateTask };
