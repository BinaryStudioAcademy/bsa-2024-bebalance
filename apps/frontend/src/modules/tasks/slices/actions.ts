import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { name as sliceName } from "./tasks.slice.js";

const getAllUsersTasks = createAsyncThunk<
	TaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get`, async (_, { extra }) => {
	const { tasksApi } = extra;

	return await tasksApi.getAllUsersTasks();
});

export { getAllUsersTasks };
