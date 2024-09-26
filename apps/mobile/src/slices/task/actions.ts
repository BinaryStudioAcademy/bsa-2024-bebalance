import { createAsyncThunk } from "@reduxjs/toolkit";

import { TaskStatus } from "~/libs/enums/enums";
import { type AsyncThunkConfig } from "~/libs/types/types";
import { type TaskDto, type TaskUpdatePayload } from "~/packages/tasks/tasks";

import { name as sliceName } from "./task.slice";

const getCurrentTasks = createAsyncThunk<
	TaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-current-tasks`, async (_, { extra }) => {
	const { expiredTaskNotification, tasksApi } = extra;
	const tasks = await tasksApi.getCurrentTasks();
	await expiredTaskNotification.addToTasks(tasks);

	return tasks;
});

const getPastTasks = createAsyncThunk<TaskDto[], undefined, AsyncThunkConfig>(
	`${sliceName}/get-past-tasks`,
	async (_, { extra }) => {
		const { tasksApi } = extra;

		return await tasksApi.getPastTasks();
	},
);

const updateTask = createAsyncThunk<
	TaskDto,
	TaskUpdatePayload,
	AsyncThunkConfig
>(`${sliceName}/update-task`, async (payload, { extra }) => {
	const { expiredTaskNotification, tasksApi } = extra;
	const { id, ...data } = payload;
	const task = await tasksApi.updateTask(id, data);
	const { status } = task;

	const isPastTask =
		status === TaskStatus.COMPLETED || status === TaskStatus.SKIPPED;

	if (isPastTask) {
		await expiredTaskNotification.cancel(id);
	}

	return task;
});

const updateTaskDeadline = createAsyncThunk<TaskDto, number, AsyncThunkConfig>(
	`${sliceName}/update-task-deadline`,
	async (id: number, { extra }) => {
		const { expiredTaskNotification, tasksApi } = extra;

		const task = await tasksApi.updateTaskDeadline(id);
		const { description, dueDate: deadline, id: taskId } = task;
		await expiredTaskNotification.createForNotExpired({
			deadline,
			description,
			taskId,
		});

		return task;
	},
);

export { getCurrentTasks, getPastTasks, updateTask, updateTaskDeadline };
