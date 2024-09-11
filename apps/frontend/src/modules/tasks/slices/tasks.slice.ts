import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { getCurrentUsersTasks } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	tasks: null | TaskDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	tasks: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getCurrentUsersTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getCurrentUsersTasks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.tasks = action.payload;
		});
		builder.addCase(getCurrentUsersTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "tasks",
	reducers: {},
});

export { actions, name, reducer };
