import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";

import { signOut } from "../auth/actions";
import { getCurrentTasks, getPastTasks, updateTask } from "./actions";

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
		builder.addCase(getPastTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPastTasks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.tasks = action.payload;
		});
		builder.addCase(getPastTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(updateTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.tasks = state.tasks.filter((task) => {
				return task.id !== action.payload.id;
			});
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signOut.pending, () => {
			return initialState;
		});
	},
	initialState,
	name: "tasks",
	reducers: {},
});

export { actions, name, reducer };
