import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type TaskDto, type TaskUpdatePayload } from "~/modules/tasks/tasks.js";

import { name as sliceName } from "./tasks.slice.js";

const getCurrentTasks = createAsyncThunk<
	TaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-current-tasks`, async (_, { extra }) => {
	const { tasksApi } = extra;

	return await tasksApi.getCurrentTasks();
});

const updateTask = createAsyncThunk<
	TaskDto,
	TaskUpdatePayload,
	AsyncThunkConfig
>(`${sliceName}/update-task`, async (payload, { extra }) => {
	const { tasksApi } = extra;
	const { id, task } = payload;

	return await tasksApi.updateTask(id, task);
});

export { getCurrentTasks, updateTask };
