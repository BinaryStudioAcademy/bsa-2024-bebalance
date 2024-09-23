import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type TaskDto, type TaskNoteDto } from "~/modules/tasks/tasks.js";

import {
	addNote,
	getCurrentTasks,
	getPastTasks,
	getTaskNotes,
	update,
	updateTaskDeadline,
} from "./actions.js";

type State = {
	activeTasks: TaskDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	expiredTasks: TaskDto[];
	task_notes: TaskNoteDto[];
	tasks: TaskDto[];
};

const initialState: State = {
	activeTasks: [],
	dataStatus: DataStatus.IDLE,
	expiredTasks: [],
	task_notes: [],
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
			state.tasks = state.tasks.filter((task) => {
				return task.id !== action.payload.id;
			});
		});
		builder.addCase(update.rejected, (state) => {
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

		builder.addCase(addNote.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(addNote.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.task_notes = action.payload;
		});
		builder.addCase(addNote.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getTaskNotes.fulfilled, (state, action) => {
			state.task_notes = action.payload;
		});
		builder.addCase(getTaskNotes.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "tasks",
	reducers: {
		addExpiredTask(state, action: PayloadAction<TaskDto>) {
			state.expiredTasks = [...state.expiredTasks, action.payload];
			state.activeTasks = state.activeTasks.filter(
				(task) => task.id !== action.payload.id,
			);
		},
		setActiveTasks(state, action: PayloadAction<TaskDto[]>) {
			state.activeTasks = action.payload;
		},
		setExpiredTasks(state, action: PayloadAction<TaskDto[]>) {
			state.expiredTasks = action.payload;
		},
	},
});

export { actions, name, reducer };
