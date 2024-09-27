import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
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
	dataStatus: ValueOf<typeof DataStatus>;
	expiredTasks: TaskDto[];
	tasks: TaskDto[];
};

const initialState: State = {
	activeTasks: [],
	dataStatus: DataStatus.IDLE,
	expiredTasks: [],
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
		builder.addCase(updateTaskDeadline.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTaskDeadline.fulfilled, (state, action) => {
			state.tasks = state.tasks.map((task) => {
				if (task.id === action.payload.id) {
					return action.payload;
				}

				return task;
			});

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
		setActiveTasks: (state, action: PayloadAction<TaskDto[]>) => {
			state.activeTasks = action.payload;
		},
		setExpiredTasks: (state, action: PayloadAction<TaskDto[]>) => {
			state.expiredTasks = action.payload;
		},
	},
});

export { actions, name, reducer };
