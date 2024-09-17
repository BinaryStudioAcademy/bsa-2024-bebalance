import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { type TaskUpdatePayload } from "../libs/types/types.js";
import { name as sliceName } from "./tasks.slice.js";

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

const update = createAsyncThunk<TaskDto, TaskUpdatePayload, AsyncThunkConfig>(
	`${sliceName}/get-current-tasks`,
	async (payload, { extra }) => {
		const { tasksApi } = extra;
		const { data, id } = payload;

		return await tasksApi.update(id, data);
	},
);

export { getCurrentTasks, getPastTasks, update };
