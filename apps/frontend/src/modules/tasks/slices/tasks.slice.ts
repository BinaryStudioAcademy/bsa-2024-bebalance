import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { NumericalValue } from "../libs/enums/enums.js";
import { getCurrentTasks, getPastTasks, update } from "./actions.js";

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

		builder.addCase(update.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id,
			);
			state.tasks = [
				...state.tasks.slice(NumericalValue.ZERO, index),
				...state.tasks.slice(index + NumericalValue.ONE),
			];
		});
		builder.addCase(update.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "tasks",
	reducers: {},
});

export { actions, name, reducer };
