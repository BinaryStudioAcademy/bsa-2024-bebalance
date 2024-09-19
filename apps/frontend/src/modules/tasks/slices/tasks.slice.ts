import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import {
	NOT_FOUND_INDEX,
	SINGLE_ELEMENT,
} from "../libs/constants/constants.js";
import { getCurrentTasks, updateTask, updateTaskDeadline } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	tasks: TaskDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	tasks: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getCurrentTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getCurrentTasks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.tasks = action.payload;
		});
		builder.addCase(getCurrentTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			const taskIndex = state.tasks.findIndex(
				(task) => task.id === action.payload.id,
			);

			if (taskIndex !== NOT_FOUND_INDEX) {
				state.tasks.splice(taskIndex, SINGLE_ELEMENT);
			}

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateTaskDeadline.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTaskDeadline.fulfilled, (state, action) => {
			const taskIndex = state.tasks.findIndex(
				(task) => task.id === action.payload.id,
			);

			if (taskIndex !== NOT_FOUND_INDEX) {
				state.tasks[taskIndex] = action.payload;
			}

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateTaskDeadline.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "tasks",
	reducers: {},
});

export { actions, name, reducer };
