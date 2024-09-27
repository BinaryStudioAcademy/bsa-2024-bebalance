import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { getActiveAndExpiredTasks } from "~/libs/helpers/helpers";
import { type ValueOf } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";

import { signOut } from "../auth/actions";
import {
	getCurrentTasks,
	getPastTasks,
	updateTask,
	updateTaskDeadline,
} from "./actions";

type State = {
	activeTasks: TaskDto[];
	currentTasks: TaskDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	expiredTasks: TaskDto[];
	pastTasks: TaskDto[];
};

const initialState: State = {
	activeTasks: [],
	currentTasks: [],
	dataStatus: DataStatus.IDLE,
	expiredTasks: [],
	pastTasks: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getCurrentTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getCurrentTasks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			const { activeTasks, expiredTasks } = getActiveAndExpiredTasks(
				action.payload,
			);
			state.activeTasks = activeTasks;
			state.expiredTasks = expiredTasks;
		});
		builder.addCase(getCurrentTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getPastTasks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPastTasks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.pastTasks = action.payload;
		});
		builder.addCase(getPastTasks.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(updateTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.activeTasks = state.activeTasks.filter((task) => {
				return task.id !== action.payload.id;
			});
			state.expiredTasks = state.expiredTasks.filter((task) => {
				return task.id !== action.payload.id;
			});
			state.pastTasks = [...state.pastTasks, action.payload];
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateTaskDeadline.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTaskDeadline.fulfilled, (state, action) => {
			state.activeTasks = [...state.activeTasks, action.payload];
			state.expiredTasks = state.expiredTasks.filter(
				(task) => task.id !== action.payload.id,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateTaskDeadline.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signOut.pending, () => {
			return initialState;
		});
	},
	initialState,
	name: "tasks",
	reducers: {
		addExpiredTask: (state, action: PayloadAction<TaskDto>) => {
			state.expiredTasks = [...state.expiredTasks, action.payload];
			state.activeTasks = state.activeTasks.filter(
				(task) => task.id !== action.payload.id,
			);
		},
	},
});

export { actions, name, reducer };
