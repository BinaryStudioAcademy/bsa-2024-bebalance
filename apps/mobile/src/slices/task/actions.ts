import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";

import { name as sliceName } from "./task.slice";

const getCurrentTasks = createAsyncThunk<
	TaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-current-tasks`, async (_, { extra }) => {
	const { tasksApi } = extra;

	return await tasksApi.getCurrentTasks();
});

export { getCurrentTasks };
